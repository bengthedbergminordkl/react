# Client State

Client state in a React application refers to any data that is managed and stored entirely within the frontend application, specifically within the user's browser. 

This data does not need to be fetched from a backend server and is typically related to the user interface (UI) and user interactions.

Characteristics of Client State:

* **Managed Locally**: Client state resides and is updated within the React application itself.
* **Ephemeral**: It can be specific to a user's current session or interaction and may not persist across page reloads unless explicitly handled (e.g., using local storage).
* **UI-Centric**: Often directly influences the appearance and behavior of UI components.

Examples of Client State:

* The current value of a form input field.
* The visibility of a modal dialog or dropdown menu.
* The active tab in a tabbed interface.
* A theme preference (e.g., dark mode toggle).
* The current state of a counter or timer.

Management of Client State in React:

React provides built-in mechanisms for managing client state:

* `useState` Hook: Used for managing local state within a functional component.
    ```js
    import React, { useState } from 'react';

    function Counter() {
      const [count, setCount] = useState(0);

      const increment = () => {
        setCount(count + 1);
      };

      return (
        <div>
          <p>Count: {count}</p>
          <button onClick={increment}>Increment</button>
        </div>
      );
    }
    ```
* `useReducer` Hook:

    Suitable for more complex state logic involving multiple related state variables or when state transitions depend on the previous state.

* `Context API (useContext)`:

    Enables sharing state across multiple components without prop drilling, making it suitable for global client state like user authentication status or theme settings.

## Implementation of global client state

The [first example](useState.md) will use the React Context API and the `useState` hook.

The [second example](useReducer.md) will use the `useReducer`. The `useReducer` hook in React is a way to manage complex state logic in functional components. It allows you to define a reducer function that specifies how the state should change in response to different actions, making it useful for handling multiple state transitions in a predictable manner.

The [third example](zusand.md) will use the Zustand library. Zustand is a small, fast, and scalable state management library for React that provides a simple and intuitive API for managing global state in your application.
