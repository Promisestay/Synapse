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

  const signup = async (userData) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        // Assuming API returns user data and/or token
        // Adjust these fields based on actual API response structure
        const user = data.user || data;
        const token = data.token;

        if (token) localStorage.setItem("token", token);

        setCurrentUser(user);
        setIsLoggedIn(true);
        localStorage.setItem("currentUser", JSON.stringify(user));
        return { success: true };
      } else {
        return { success: false, message: data.message || "Signup failed" };
      }
    } catch (error) {
      console.error("Signup error:", error);
      return { success: false, message: "Network error. Please try again." };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const user = data.user || data;
        const token = data.token;

        if (token) localStorage.setItem("token", token);

        setCurrentUser(user);
        setIsLoggedIn(true);
        localStorage.setItem("currentUser", JSON.stringify(user));
        return { success: true };
      } else {
        return { success: false, message: data.message || "Invalid credentials" };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Network error. Please try again." };
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("token");
      await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Always clear local state even if API fails
      setCurrentUser(null);
      setIsLoggedIn(false);
      localStorage.removeItem("currentUser");
      localStorage.removeItem("token");
    }
  };

  const updateCredits = (amount) => {
    if (!currentUser) return;
    const newCredits = (currentUser.credits || 0) + parseInt(amount);
    const updatedUser = { ...currentUser, credits: newCredits };

    setCurrentUser(updatedUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
  };

  const updateProfile = (updatedData) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, ...updatedData };

    setCurrentUser(updatedUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    // In a real app, you would also POST/PUT to the API here
    // const response = await fetch("/api/profile", { ... })
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{ currentUser, isLoggedIn, signup, login, logout, updateCredits, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}
