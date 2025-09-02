// AuthTypes.ts

export interface User {
  id: string;
  name: string;
  email: string;
}

// We'll define a type for each action.
interface LoginAction {
    type: 'LOGIN';
    payload: User;
}

interface LogoutAction {
    type: 'LOGOUT';
}

// This is a "discriminated union" of our possible actions.
export type AuthAction = LoginAction | LogoutAction;

// The shape of our context value remains the same, but the functions inside
// will call 'dispatch' now instead of 'setState'.
export interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}