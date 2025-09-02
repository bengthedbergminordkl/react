# State using useState hooks

The **Context API** is a built-in feature in React that lets us share state, or data, across our components without needing to pass props manually down the component tree.
Think of it like a global bulletin board where any component can read the information posted there.

When we talk about _context_ in React, we're really talking about a way to maintain data, like a user's logged-in status or the items in a shopping cart,
available to many components throughout your application without having to manually pass it down through props. This solves a problem known as _prop drilling_.

So, let's use your example of an authentication system. Imagine you have a component deep inside your app that needs to know if the user is logged in.
Without context, you might have to pass the `isLoggedIn` prop from the top-level `App` component,
down to a `Dashboard` component, then to a `Header` component, and finally to a `ProfileIcon` component.
That can get messy!

With the Context API, we can create a central _store_ for this information.

We can break down how this works into three main steps:

1. **Creating the Context**: We first need to create the _container_ for our data.
2. **Providing the Context**: We then wrap the parts of our app that need this data with a `Provider` component.
3. **Consuming the Context**: Finally, any component inside that wrapped section can _consume_ or access the data directly.

### Create Context

In React, the `createContext` function is what we use to create this _container_ we mentioned.
When we create a context, we can give it a default value. This is the value that will be used if a
component tries to read from the context without a provider above it.

So, for our authentication context, we'd need to define a type that represents the entire state.

This state should contain the `isLoggedIn` boolean and the `user` object. We'll also need to include
functions for logging in and out, since we'll want to update the state.

Here's how we could define those types in our `AuthContext.ts` file:

```ts
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}
```

We're creating a `User` type for our user object and a `AuthContextType` for the entire context value,
which includes the boolean, the user object (which could be `null` if no one is logged in), and the two functions.

Now that we have our types defined, we can create our context using them.

```ts
import { createContext } from "react";
import { AuthContextType } from "./AuthContextTypes"; // Assuming we put the types in a separate file

export const AuthContext = createContext<AuthContextType | null>(null);
```

You might be wondering why we're using `AuthContextType | null` for the context value and providing `null`
as the initial value. This is a common pattern with TypeScript and Context.

The reason we initialize the context with null is a safety measure, especially when using TypeScript.
Remember, a provider is what actually "provides" the value to the context. A component can try to consume
the context, but if there isn't a provider wrapped around it somewhere up the component tree, it won't be able to get the real value.

So, null acts as a placeholder or a default value for our context.
It's essentially saying, "Hey, if no provider is present, the value of this context is just... nothing."
This prevents our app from crashing if a component tries to access the context when a provider hasn't been set up yet.

### Provide Context

The next logical step is to provide the context to our application.

To do this, we'll create a new component, which we can call `AuthProvider`. `Provider` is the the naming convention
for these type of components.

This component will have a few jobs:

1. Hold the actual state (like `isLoggedIn` and `user`).
2. Hold the functions that update that state (like `login` and `logout`).
3. Use the `AuthContext.Provider` to wrap its children and pass that state and those functions down.

So, the `AuthProvider` component will be the place where we manage the state for the entire context.
It's a key part of the pattern!

With that in mind, what React hook do we typically use to manage state within a component?

The `useState` hook is the perfect tool for this. It lets us add state to a functional component.
It takes an initial state value and returns an array with two things:

- the current state and
- a function to update it.

So, inside our `AuthProvider` component, we'll use `useState` to manage the `isLoggedIn` boolean and the `user` object.

How about we think about what the initial state of our authentication system should be?

What should `isLoggedIn` and `user` be set to when the app first loads and no one is logged in yet?

The initial state will be `false` for `isLoggedIn` and `null` for `user` as this reflects the fact that when our app first loads,
no user is authenticated yet.

The next part of the puzzle is to include the functions that will update this state.
Our `AuthContextType` interface specified two functions: `login` and `logout`.

To make that happen, the `login` function will need to:

1. Accept a `user` object as an argument.
2. Use the `setLoggedIn` function from our `useState` hook to change the state to true.
3. Use the `setUser` function from our `useState` hook to set the `user` state to the `userData` that was passed in.

The `logout` function would do the reverse: set `isLoggedIn` to false and `user` back to null.

So, putting it all together, our `AuthProvider` component will look something like this:

```ts
// AuthProvider.tsx
import { useState, useMemo } from "react";
import { AuthContext } from "./AuthContext";
import { User } from "./AuthTypes";

export const AuthProvider: React.FC = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  // We use useMemo to optimize the provider's value.
  const authContextValue = useMemo(
    () => ({
      isLoggedIn,
      user,
      login,
      logout,
    }),
    [isLoggedIn, user]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
```

This component is now the _brain_ of our context.

The last piece of the puzzle is to actually use this provider to wrap our application.

We'll wrap our entire application inside the `<AuthProvider>` component.

By placing the `<AuthProvider>` at the very top of our component tree, usually in the `App` component, we ensure that all the components nested inside of it have access to the context's state and functions.

Here's a simple example of what that would look like:

```ts
// App.tsx
import { AuthProvider } from "./AuthProvider";
import { Home } from "./Home";

function App() {
  return (
    <AuthProvider>
      <Home />
    </AuthProvider>
  );
}

export default App;
```

In this setup, the `<Home />` component and any components it renders will be able to access the authentication state.

Now for the last piece of the puzzle: consuming the context.

### Consume the Context

The `useContext` hook is the final piece of our puzzle.

The `useContext` hook is what we use in our components to _consume_ the data that the provider is making
available. It's the key to avoiding prop drilling.

So, in any component that's wrapped by our `<AuthProvider>`, we can use `useContext` to directly grab the `isLoggedIn`
status, the `user` object, and the `login` and `logout` functions.

Here's what that might look like inside a component:

```ts
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function ProfileIcon() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    // This is important for our null initial value
    throw new Error("ProfileIcon must be used within an AuthProvider");
  }

  // Now we can access the values directly
  const { isLoggedIn, user, logout } = authContext;

  if (isLoggedIn) {
    return (
      <div>
        <p>Welcome, {user?.name}</p>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  return <p>Please log in</p>;
}
```

This is much cleaner than passing props from the `App` component all the way down to `ProfileIcon`, right?

By using the Context API, we:

1. **Avoid prop drilling**, which makes our components much cleaner. The `ProfileIcon` component doesn't need
   to know anything about its parent components; it just needs to know about the `AuthContext` to get the data it needs.

2. **Centralize our state logic** within the `AuthProvider` component. If we need to change how a user logs in or out,
   we only have to change the code in one place.

### Implementation

See [useState sample application](./useState/) for full implementation.
