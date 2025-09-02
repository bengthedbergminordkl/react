# State with Zusand

> Note: This follows on the [useReducer](./useReducer.md) example.

While we've been focusing on the built-in React Context API, it's really helpful to see how other libraries, like **Zustand**, approach state management. They often work together with Context in interesting ways.

Zustand is a state management library that's known for being small, fast, and simple. It's built on a different principle than React Context. Instead of creating a `Provider` to wrap your entire application, Zustand gives you a store that any component can directly subscribe to.

> So, how do you think a library like Zustand might handle the same problems we used Context to solve, like avoiding prop drilling and centralizing state logic?

Zustand's approach is based on creating a **store**, and then any component can simply _subscribe_ to that store using a hook, such as `useStore`. This allows a component to pull the exact piece of state it needs directly from the source, rather than having to be wrapped inside a `Provider` component.

Think of it like this:

- **React Context** is like a bulletin board that a parent component sets up. Only components inside the building can see what's on the board.

- **Zustand** is like a publicly-available cloud drive. Any component, no matter where it is, can access the drive and grab the files it needs.

> So, since Zustand doesn't rely on a Provider to make its state available, what's a key benefit of that approach for you as a developer? And on the flip side, can you think of any potential drawbacks?

One big benefit of Zustand's approach is that it can lead to cleaner and more maintainable code. Since components can directly access the state they need, you avoid the complexity of wrapping components in multiple Providers. This can make your component tree less cluttered and easier to understand.

However, a potential drawback is that it can make it harder to track where state changes are coming from. With Context, you have a clear hierarchy and flow of data, which can make debugging easier. With Zustand, since any component can access the store directly, it might be less obvious how and when state changes occur.

Imagine you're building two different applications:

- A small-scale app with only a few shared state values (like a user's theme preference).

- A large, complex app with many different data models and actions (like a full e-commerce site).

> Which state management approach do you think might be a better fit for each scenario, and why?

For the small-scale app, using React Context might be sufficient. The simplicity of Context works well when you have only a few pieces of state to share, and it keeps things straightforward without adding extra dependencies.

For the large, complex app, Zustand could be a better fit. Its ability to manage more complex state logic and allow components to directly access the store can help keep the codebase cleaner and more manageable as the application grows.

## Example Implementation

Here's how you might implement a simple authentication store using Zustand, based on our previous sample app.

Add the library:

`npm install zustand`

Unlike the Context API, where we have to `createContext` and then a `Provider`, with Zustand, we just need to create a single `store` that holds both the state and the actions that modify that state.

Let's start with the store itself.

`authStore.ts`

This is where the magic happens. We'll define a Zustand store that contains our authentication state and the functions to change it.

```ts
// authStore.ts
import { create } from "zustand";

// Let's define the shape of our state and actions in a single interface
interface AuthState {
  isLoggedIn: boolean;
  user: { id: string; name: string; email: string } | null;
  login: (userData: { id: string; name: string; email: string }) => void;
  logout: () => void;
}

// We use the 'create' function to build our store.
// 'set' is the function Zustand gives us to update the state.
export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,

  login: (userData) => {
    // We use the set function to update multiple state properties at once
    set({ isLoggedIn: true, user: userData });
  },

  logout: () => {
    // We use the set function to reset the state
    set({ isLoggedIn: false, user: null });
  },
}));
```

Now, let's look at how the other components use this store. This is where the biggest difference from the Context API becomes clear.

`ProfileIcon.tsx`

Notice how this component is much simpler. It doesn't need to use `useContext` or check for a provider because the store is always available.

```ts
// ProfileIcon.tsx
import { useAuthStore } from "./authStore";

export const ProfileIcon: React.FC = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const user = useAuthStore((state) => state.user);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  if (isLoggedIn) {
    return (
      <div>
        <p>Welcome, {user?.name}</p>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  return <p>Please log in</p>;
};
```

The `App.tsx` file is even simpler! Since we don't need a `Provider` component to wrap our app, the component tree is much cleaner.

```tsx
// App.tsx
import { ProfileIcon } from "./ProfileIcon";

function App() {
  return (
    <div className="App">
      <h1>Zustand State Management Example</h1>
      <ProfileIcon />
    </div>
  );
}

export default App;
```

See [sample app](./zusand/) for full implementation.
