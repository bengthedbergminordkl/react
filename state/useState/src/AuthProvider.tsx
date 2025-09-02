// AuthProvider.tsx

import { useState, useMemo } from "react";
import type { FC, ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { User, AuthContextType } from "./AuthTypes";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  // We use useMemo to optimize the provider's value. This ensures the value
  // only changes when isLoggedIn or user actually change.
  const authContextValue: AuthContextType = useMemo(
    () => ({
      isLoggedIn,
      user,
      login,
      logout,
    }),
    [isLoggedIn, user]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
