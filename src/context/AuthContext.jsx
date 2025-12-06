import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("currentUser");
    return saved ? JSON.parse(saved) : null;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem("currentUser");
  });

  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const saved = localStorage.getItem("registeredUsers");
    return saved ? JSON.parse(saved) : [
      { name: "Student User", email: "student@university.edu", password: "password", credits: 40 }
    ];
  });

  const signup = (userData) => {
    // Check if user already exists
    if (registeredUsers.some(u => u.email === userData.email)) {
      return { success: false, message: "User already exists" };
    }
    const newUser = { ...userData, password: userData.password || "password" };
    setRegisteredUsers([...registeredUsers, newUser]);
    setCurrentUser(newUser);
    setIsLoggedIn(true);
    return { success: true };
  };

  const login = (email, password) => {
    const user = registeredUsers.find(u => u.email === email); 
    if (user) {
      if (password && user.password !== password) {
        return { success: false, message: "Invalid password" };
      }
      setCurrentUser(user);
      setIsLoggedIn(true);
      return { success: true };
    }
    return { success: false, message: "User not found" };
  };

  const logout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("currentUser");
  };

  const updateCredits = (amount) => {
    if (!currentUser) return;
    const newCredits = (currentUser.credits || 0) + parseInt(amount);
    const updatedUser = { ...currentUser, credits: newCredits };

    setCurrentUser(updatedUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

   
    const updatedRegistry = registeredUsers.map(u =>
      u.email === currentUser.email ? updatedUser : u
    );
    setRegisteredUsers(updatedRegistry);
    localStorage.setItem("registeredUsers", JSON.stringify(updatedRegistry));
  };

  return (
    <AuthContext.Provider value={{ currentUser, isLoggedIn, signup, login, logout, updateCredits }}>
      {children}
    </AuthContext.Provider>
  );
}
