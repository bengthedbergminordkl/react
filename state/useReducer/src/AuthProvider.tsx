// AuthProvider.tsx

import { useReducer, useMemo } from "react";
import type { FC, ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { User, AuthContextType, AuthAction } from "./AuthTypes";

interface AuthProviderProps {
  children: ReactNode;
}

// 1. We define our initial state object and type
interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
};

// 2. We create our reducer function
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      // The login action has a payload
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case "LOGOUT":
      // The logout action doesn't have a payload
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  // 3. We use the useReducer hook
  const [state, dispatch] = useReducer(authReducer, initialState);

  // We still provide the same functions to the rest of the app
  const login = (userData: User) => {
    dispatch({ type: "LOGIN", payload: userData });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const authContextValue: AuthContextType = useMemo(
    () => ({
      isLoggedIn: state.isLoggedIn,
      user: state.user,
      login,
      logout,
    }),
    [state.isLoggedIn, state.user]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
