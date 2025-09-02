# Store Web Client

## Foundational Architecture & Project Initialization

The Store web client is built using React with TypeScript, leveraging Vite as the build tool for its speed and efficiency. The project structure is designed to promote scalability, maintainability, and ease of development.

### Create Project

Creating the project is a straightforward, command-line process. The Vite CLI automates the scaffolding and dependency installation, ensuring a consistent starting point.

`npm create vite@latest`

```bash
> npx
> create-vite

│
◇  Project name:
│  store
│
◇  Select a framework:
│  React
│
◇  Select a variant:
│  TypeScript + SWC
│
◇  Scaffolding project in C:\Users\bengt.hedberg\store...
│
└  Done. Now run:

  cd store
  npm install
  npm run dev
```

### Configuring for a Production-Ready TypeScript Environment

Moving from a basic scaffolded project to a robust, production-ready environment requires meticulous configuration of the TypeScript and linting toolchain. A standard Vite and TypeScript project uses a tripartite `tsconfig` file structure to properly handle different environments.

- `tsconfig.json`: This is the main configuration file that acts as a root, referencing the other two files.

- `tsconfig.app.json`: This file defines the configuration for the browser environment, handling .tsx files and browser-specific global types.

- `tsconfig.node.json`: This file is for the Node.js environment, which is used for build scripts and server-side configurations.

This separation ensures that the compiler and editor correctly interpret the code for its intended environment. The report also addresses code quality by integrating ESLint with TypeScript.

- `eslint.config.js` file is then updated to include the recommended configurations from these plugins, ensuring that the codebase adheres to strict code quality standards from the outset.

For a scalable and maintainable project, using path aliases is a highly recommended practice. This allows for cleaner, absolute imports (e.g., `import { Button } from '@/components/Button')` instead of relative imports (`import { Button } from '../../components/Button`').

The vite-tsconfig-paths plugin simplifies this process by automatically resolving aliases defined in `tsconfig.json`. This architectural choice prevents import spaghetti, improves code readability, and streamlines refactoring as the project grows.

`npm i vite-tsconfig-paths`

Rename the file `vite.config.ts` to `vite.config.mts` and update it

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 4200,
  },
});
```

Add the following to the `"compilerOptions":` in `tsconfig.app.json` and `tsconfig.node.json`:

```
 "paths": {
      "@/*": ["./src/*"]
    }
```

Restart your development server on the command line. You may encounter compile errors in the browser and editor/IDE.

### Project Directory Structure

The following structure is used, reflecting the architectural patterns discussed in this report and aligning with best practices for a multi-page React application.

| Directory            | Purpose                                                                                                                |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `src/assets`         | Static assets like images, fonts, and icons.                                                                           |
| `src/components`     | Reusable, presentational components (e.g., `<Button>`, `<Card>`, `<Navbar>`).                                          |
| `src/lib`            | Utility functions and modules that are not components or hooks (e.g., API clients, helper functions for calculations). |
| `src/pages`          | Top-level page components that map to routes (e.g., HomePage.tsx, CartPage.tsx, CheckoutPage.tsx).                     |
| `src/store`          | Zustand store definitions and related state management logic.                                                          |
| `src/routes`         | Routes used in React route                                                                                             |
| `src/hooks`          | Custom React hooks that encapsulate complex logic and state.                                                           |
| `src/types`          | TypeScript type and interface definitions for the application's data models.                                           |
| `src/main.tsx`       | The application's entry point, responsible for rendering the root component and configuring providers.                 |
| `src/App.tsx`        | The root component that defines the application's routing.                                                             |
| `vite.config.ts`     | Vite configuration file.                                                                                               |
| `tsconfig.json`      | Root TypeScript configuration.                                                                                         |
| `tailwind.config.ts` | Tailwind CSS configuration.                                                                                            |

### Integrating Tailwind CSS

Tailwind CSS is a utility-first CSS framework that allows for rapid UI development with a focus on responsiveness and design consistency. Integrating Tailwind into the project involves several steps:

1. Install Tailwind CSS

   Install tailwindcss and @tailwindcss/vite via npm.

   `npm install tailwindcss @tailwindcss/vite`

2. Configure the Vite plugin

   Add the `@tailwindcss/vite` plugin to your Vite configuration.

   ```ts
   //vite.config.ts
   import { defineConfig } from "vite";
   import react from "@vitejs/plugin-react-swc";
   import tsconfigPaths from "vite-tsconfig-paths";
   import tailwindcss from "@tailwindcss/vite";

   // https://vite.dev/config/
   export default defineConfig({
     plugins: [react(), tsconfigPaths(), tailwindcss()],
     server: {
       port: 4200,
     },
   });
   ```

3. Import Tailwind CSS

   Add an `@import` to the `index.css` file that imports Tailwind CSS.

   ```css
   @import "tailwindcss";
   ```

4. Quick Usage

   Add som quick usage in `App.tsx` of tailwind to prove it works

   ```ts
   function App() {
     return (
       <>
         <h1 className="text-3xl font-bold underline">Hello</h1>
       </>
     );
   }

   export default App;
   ```

5. Test

   ```
   npm run lint
   npm run dev
   ```

### Add Navigation and Routes

For a multi-page application, routing is essential. React Router is a popular choice for handling navigation in React applications.

1. Install React Router from npm:

   ```
   npm i react-router
   ```

2. Add Route Provider to the `main.tsx` file :

   ```ts
   import { StrictMode } from "react";
   import { createRoot } from "react-dom/client";
   import { RouterProvider } from "react-router/dom";
   import { router } from "@/routes/Routes";
   import "@/index.css";

   createRoot(document.getElementById("root")!).render(
     <StrictMode>
       <RouterProvider router={router} />
     </StrictMode>
   );
   ```

3. Create a `Header` Component:

   ```ts
   // components/Header.tsx
   function Header() {
     return (
       <>
         <h1 className="text-3xl font-bold underline">Header</h1>
       </>
     );
   }

   export default Header;
   ```

4. Create some dummy pages for Cart and Checkout :

   ```ts
   // pages/Cart.tsx
   function Cart() {
     return (
       <>
         <h1 className="text-3xl font-bold underline">Cart</h1>
       </>
     );
   }

   export default Cart;
   ```

   ```ts
   // pages/Checkout.tsx
   function Checkout() {
     return (
       <>
         <h1 className="text-3xl font-bold underline">Checkout</h1>
       </>
     );
   }

   export default Checkout;
   ```

   ```ts
   function Menu() {
     return (
       <>
         <h1 className="text-3xl font-bold underline">Menu</h1>
       </>
     );
   }

   export default Menu;
   ```

5. Update `App.tsx` :

   ```ts
   import { Outlet } from "react-router";
   import Header from "@/components/Header";

   function App() {
     return (
       <>
         <Header />
         <Outlet />
       </>
     );
   }

   export default App;
   ```

6. Implement the navigation routes:

   ```ts
   // src/routes/Routes.tsx
   import { createBrowserRouter } from "react-router";
   import App from "@/App";
   import Cart from "@/pages/Cart";
   import Checkout from "@/pages/Checkout";

   export const router = createBrowserRouter([
     {
       path: "/",
       element: <App />,
       children: [
         { path: "", element: <Menu /> },
         { path: "cart", element: <Cart /> },
         { path: "checkout", element: <Checkout /> },
       ],
     },
   ]);
   ```

### Add some style

1. Add Icons

    `npm install react-icons --save`

2. Update `Header.tsx`

3. Add a product item type :

    ```ts
    export interface ProductItem {
      id: string;
      name: string;
      description: string;
      price?: number;
      priceRange?: number[];
      image: string;
      category: 'giftcard' | 'discount' | 'specialty';
    }
    ```

4. Add a MenuItem component/

5. Update the Menu Page.

6. Add the fav icon to index.html 

  ```html
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/png" href="/images/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>The Coffee Club</title>
      </head>
      <body>
        <div id="root"></div>
        <script type="module" src="/src/main.tsx"></script>
      </body>
    </html>
  ```