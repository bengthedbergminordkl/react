// ProfileIcon.tsx

import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const ProfileIcon: React.FC = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    // This is a safety check to ensure we're inside the provider's scope.
    throw new Error("ProfileIcon must be used within an AuthProvider");
  }

  // Destructure the values directly from the context
  const { isLoggedIn, user, logout, login } = authContext;

  if (isLoggedIn) {
    return (
      <div>
        <p>Welcome, {user?.name}</p>
        <button onClick={logout}>Logout</button>
      </div>
    );
  }

  // If not logged in, display a simple message
  return (
    <div>
      <p>You are not logged in</p>
      <button
        onClick={() =>
          login({ id: "1", name: "Guest", email: "guest@example.com" })
        }
      >
        Login
      </button>
    </div>
  );
};
