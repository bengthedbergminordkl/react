// ProfileIcon.tsx
import { useAuthStore } from "./authStore";

export const ProfileIcon: React.FC = () => {
  // We use the hook directly to get the state and actions we need.
  // The 'isLoggedIn' and 'user' values are "selected" from the store.
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
