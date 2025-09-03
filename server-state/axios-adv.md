# Enhanced Axios: Authentication and Robust Error Handling

We'll build upon our previous example, creating a more realistic scenario where we need to send an authentication token with our requests and handle various types of errors gracefully.

-----

## Step 1: Centralizing the Logic with Axios Interceptors

The best place to handle authentication and global errors is in a centralized Axios instance using **interceptors**. This ensures that the logic is applied to every request and response, regardless of which component is making the call.

Let's modify our `api/client.js` file to include this logic.

```jsx
// src/api/client.js
import axios from 'axios';

// Create a reusable Axios instance with a base URL
const apiClient = axios.create({
  baseURL: 'https://api.example.com/v1', // Replace with your actual API base URL
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// **Request Interceptor**
// Automatically adds the authentication token to every outgoing request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// **Response Interceptor**
// Handles global errors and redirects
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if the error has a response object
    if (error.response) {
      // Handle common HTTP error status codes
      switch (error.response.status) {
        case 401:
          console.error('Unauthorized access. Redirecting to login...');
          // In a real application, you would clear the token and redirect the user
          localStorage.removeItem('authToken');
          window.location.href = '/login'; // Or use a router's navigation method
          break;
        case 403:
          console.error('Forbidden: You do not have permission to access this resource.');
          // Show a "Forbidden" page or notification
          break;
        case 404:
          console.error('Resource not found.');
          // Show a "Not Found" message
          break;
        case 500:
          console.error('Server error. Please try again later.');
          // Display a generic error message
          break;
        default:
          console.error(`An unexpected error occurred: ${error.response.status}`);
          break;
      }
    } else if (error.request) {
      // The request was made but no response was received (e.g., network error)
      console.error('Network Error: Please check your internet connection.');
    } else {
      // Something happened in setting up the request that triggered an error
      console.error('Request setup error:', error.message);
    }
    
    // Always return a rejected promise so the component's catch block can still run
    return Promise.reject(error);
  }
);

export default apiClient;
```

**Explanation:**

  * **Request Interceptor:** We use `apiClient.interceptors.request.use` to define a function that runs before every request is sent. It checks for a token in `localStorage` and, if found, adds it to the `Authorization` header. This is a best practice for securing API endpoints.
  * **Response Interceptor:** We use `apiClient.interceptors.response.use` to catch responses. The first callback handles successful responses, and the second handles any errors.
  * **Centralized Error Handling:** Inside the error callback, we can inspect the `error` object to determine the cause.
      * `error.response`: This object exists if the server responded with a status code outside the 2xx range. We can use a `switch` statement to handle common status codes (401, 403, 404, 500) with specific actions or messages.
      * `error.request`: This object exists if a network error occurred (e.g., the server is down or the user is offline).
      * `error.message`: This catches other issues, like a timeout.

-----

## Step 2: Implementing the Enhanced Logic in a Component

Now, our components can be much cleaner. They only need to handle the state and data from the API call, without worrying about the specifics of authentication or global errors. The Axios instance takes care of that for us.

Let's refactor our `DataFetcher` component to use the new `apiClient`.

```jsx
// src/components/DataFetcher.jsx
import React, { useState, useEffect } from 'react';
import apiClient from '../api/client'; // Import our new client

const DataFetcher = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await apiClient.get('/posts'); // Use our configured instance
        setPosts(response.data);
      } catch (err) {
        // Since we handle global errors in the interceptor, this catch block is for component-specific logic,
        // such as displaying a fallback UI or a personalized message.
        console.error('Failed to fetch posts in component:', err.message);
        setError("Could not retrieve posts. Please try again."); 
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading posts...</div>;
  
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default DataFetcher;
```

**What's changed and why it's better:**

  * **Cleaner Code:** The `try/catch` block in our component is now much simpler. We don't need to check for a 401 error or worry about network failures here; that's handled globally.
  * **Separation of Concerns:** The component's job is to manage its UI state and display the data. The Axios instance's job is to manage the `HTTP` communication layer. This makes our code more modular and easier to maintain.
  * **Consistency:** Every API call using `apiClient` will automatically include the authentication token and benefit from the centralized error handling, ensuring a consistent user experience throughout the application.

-----

## Conclusion

By combining Axios with request and response interceptors, you build a robust, scalable, and maintainable data-fetching architecture. You move boilerplate and repetitive logic out of your components and into a single, centralized file.

This approach not only reduces the risk of bugs and inconsistencies but also makes your code significantly cleaner. You can now build a frontend application with the confidence that your API communication is secure and resilient to a wide range of network and server-side issues.