# Routes and Navigation

**React Router** is a go-to library for handling navigation in a React application. It helps your app behave like a traditional multi-page website, but without the page refreshing every time you click a link. This is the core idea behind a "Single-Page Application" (SPA).

To get started, would you prefer to:

1. Discuss the problem that React Router solves?

2. Learn about the main components used to create routes?

3. Walk through a simple code example?

## Why

To really get it, we need to compare two ways of building websites.

Traditional Websites: Think of a simple blog or a news site. When you click a link (e.g., from the homepage to an article), your browser sends a request to a server. The server sends back a completely new HTML file, and the browser has to load this new page from scratch. You'll often see a white flash or a loading spinner while this happens.

React Apps (Single-Page Applications - SPAs): A React app is different. It loads just one HTML shell, and then JavaScript (specifically, React) takes over. It dynamically changes what you see on the screen without ever needing to fetch a whole new page from the server. This makes it feel fast and smooth, like a desktop application.

So, here's the core problem React Router solves: How do you give a Single-Page Application the features of a multi-page one (like unique URLs for different views, and working browser back/forward buttons) without triggering a full page refresh every time?

> Based on that, what do you think would happen if you used a regular HTML link, like `<a href="/about">`, inside a React app to navigate?

Using a standard `<a>` tag tells the browser to do its default behavior: stop what it's doing, send a request to the server for the page at `/about`, and load the new HTML it gets back. This completely defeats the purpose of a fast, smooth Single-Page Application.

So, React Router's main job is to give us a way to:

- Change the URL in the browser's address bar.
- Keep the browser's back and forward buttons working.
- Change the content on the screen to match the new URL...

...all without making a full page request to the server.

It essentially intercepts that navigation request and lets React handle it internally.

Now that we've covered the _why_, are you ready to move on to step 2 and look at the main components that make this happen?

## How

To start, let's look at the three main types of components that make this work. There are

- `routers`, which wrap your whole application,
- `route matchers`, which connect a URL to a component, and
- `navigation components`, which let users move between pages.

A **router** is a component that wraps your entire application and keeps track of the URL in your browser. The main job of a router is to keep track of the current location, or URL, and make sure your app's user interface is always in sync with it. It acts like the central hub for all your navigation.

The `Route` component is the one that says, "If the URL looks like this, then I'll show this specific component." It's the "matching" part of the process.

For example, you might have a Route that says:

- "If the URL is /, show the HomePage component."
- "If the URL is /about, show the AboutPage component."

So, you have the Router keeping track of the URL, and then the Route components are constantly listening to the Router to see if the current URL matches their specific path.

This folder contains examples of using routing and navigation in React applications.

- [Basic Example](./basic): A simple example demonstrating routing between different pages.

- [Protected Routes](./protected-routes): An example showing how to implement protected routes that require authentication.

- [Dynamic Routing](./dynamic-routing): An example of how to handle dynamic routes with parameters.
