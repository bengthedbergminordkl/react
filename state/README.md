# State 

If you don't know already, global state management is the process of centralizing the shared state of a web application.

This helps to ensure that different parts of the application can communicate and share data with one another, and can reduce the risk of inconsistencies or bugs like prop drilling.

There are many different libraries and approaches to managing global state in React applications. Two popular options are the built-in React Context API and a third-party library called Zustand.

## 

The [first example](useState.md) will use the React Context API and the `useState` hook.

The [second example](useReducer.md) will use the `useReducer`. The `useReducer` hook in React is a way to manage complex state logic in functional components. It allows you to define a reducer function that specifies how the state should change in response to different actions, making it useful for handling multiple state transitions in a predictable manner.

The [third example](zusand.md) will use the Zustand library. Zustand is a small, fast, and scalable state management library for React that provides a simple and intuitive API for managing global state in your application.
