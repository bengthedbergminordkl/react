# State with useReducer

> Note: This follows on the [useState](./useState.md) example.

A lot of developers pair Context with a different hook called `useReducer` for more complex state logic. 
The `useReducer` hook is often used as an alternative to `useState` when you have a lot of state to 
manage or when the next state depends on the previous one.

With our current authentication logic, we have two simple state updates:

* Set `isLoggedIn` to true and set a `user` object.
* Set `isLoggedIn` to false and set `user` to null.

> What do you notice about these two actions? How are they related?

They both operate on the same piece of state, but they do the opposite thing.

With `useReducer`, we can define a single *reducer* function that handles all of these related state changes. 
It takes the **current state** and an **action** and returns a **new state**.

Here’s why that's a big advantage for complex state:

* **Predictability**: `useReducer` makes the state transitions more predictable and easier to debug. 
  You know that every state change must go through the reducer, so you can easily track it.

* **Encapsulation**: It encapsulates all the state change logic in one place, making our code cleaner and easier to maintain.

* **Complex Actions**: It's perfect for when the next state depends on the previous state or when a single action needs to update 
  multiple values at once (like our `login` action).
  

> What information do you think the reducer function for our authentication context would need to receive in order to know what to do?
   
The reducer needs the `user` object. But it's not just the data itself that's passed to the reducer; it's passed as part of an **action object**.

Think of a reducer as a mini-robot that follows instructions. You don't just hand it an item; you give it an instruction card that says, "Here's what to do, and here's the item to do it with."

In `useReducer`, this "instruction card" is the **action object**, which almost always has two properties:

* `type`: A string that tells the reducer what kind of state change to perform (e.g., `'LOGIN'`, `'LOGOUT'`).

* `payload`: The actual data needed to perform the action (e.g., the `user` object).

> With that in mind, what would the complete action object look like for our `login` action, which needs the `user` data? And what would the action object for the `logout` action look like, since it doesn't need any extra data?

For the `login` action, we need to tell the reducer that we're logging in and provide the user's data.

So, we'd create an action object that looks like this:

```json
{
  type: 'LOGIN',
  payload: { id: 'abc-123', name: 'John Doe', email: 'john@example.com' }
}
```

The `logout` action object would look like this:

```json
{
  type: 'LOGOUT',
  payload: null // or you could omit the payload entirely
}
```

Now you have all the pieces to see how `useReducer` works with Context. Instead of our `AuthProvider` using two `useState` calls, it would use a single `useReducer` call.

The `useReducer` hook takes two arguments:

* A **reducer function** (which we've been talking about) that contains all the state update logic.
* An **initial state**.

When we want to update the state from inside the provider, we don't call a `setSomething` function. 
Instead, we call a `dispatch` function and pass it one of those action objects we just talked about.

> How do you think using a single `dispatch` function to update state might be different from using our two `setState` functions from 
before (`setIsLoggedIn` and `setUser`)?

With `useState`, our two functions (`setIsLoggedIn` and `setUser`) update **separate pieces** of state independently. 
If we need to change both at the same time, we have to call them one after the other.

With `useReducer`, we use a single dispatch function. We don't call it with a new state; instead, 
we pass it a **single action object** that describes the change we want to make.

So, in our `AuthProvider`, instead of this:

```ts
const login = (userData: User) => {
  setIsLoggedIn(true);
  setUser(userData);
};
```

Our `login` function would simply call `dispatch` with an action object:

```ts
const login = (userData: User) => {
  dispatch({ type: 'LOGIN', payload: userData });
};
```

With `useReducer`, we can treat `isLoggedIn` and `user` as a single, unified state. 
The reducer function acts as the *gatekeeper* for all state changes, ensuring that whenever we perform a 
`LOGIN` action, both the `isLoggedIn` and `user` values are updated in **one atomic operation**. 

This prevents our state from ever being in an inconsistent or unpredictable state.

This is a great example of how you can use both `useState` and `useReducer` to manage state with the React Context API, 
choosing the right tool for the complexity of the job.

## Extending

You can add new actions like `UPDATE_PROFILE` or `CHANGE_PASSWORD` using a different switch case statement, seperate from the existing `LOGIN` and `LOGOUT` actions.

To add new functionality like an `UPDATE_PROFILE` action, all we would need to do is:

* Add a new action type to our `AuthAction` union in `AuthTypes.ts`.
* Add a new case to the switch statement in our `authReducer` function.

This keeps all of our state-changing logic in one single, easy-to-read function. The entire flow of state updates is centralized and transparent.

It's a huge difference from the `useState` approach, where we might end up with many separate `setState` calls to manage different parts of our state. With `useReducer`, all of that logic is neatly contained.

You've done a great job exploring this topic! We've covered a lot of ground, from the basics of creating a context to providing state with `useState` and then `scaling` it with useReducer.

See [sample implementation](./useReducer/) for a full implementation. 

