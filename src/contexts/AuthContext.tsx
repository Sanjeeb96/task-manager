import React, { createContext, useState, useEffect, useContext } from "react";
import { auth, provider } from "../firebase/firebaseConfig";
import { signInWithPopup, onAuthStateChanged, signOut, User } from "firebase/auth";

interface AuthContextProps {
  user: User | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

   const login = async () => {
     try {
       const result = await signInWithPopup(auth, provider);
       setUser(result.user); // Set the user after login
     } catch (error) {
       console.error("Login failed:", error);
     }
   };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null); // Clear the user after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
