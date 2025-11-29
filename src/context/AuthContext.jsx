import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const DEFAULT_USERS = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@store.com",
    password: "admin123",
    role: "admin",
  },
  {
    id: 2,
    name: "Regular User",
    email: "user@store.com",
    password: "user123",
    role: "user",
  },
];

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const stored = localStorage.getItem("currentUser");
    return stored ? JSON.parse(stored) : null;
  });

  const [users, setUsers] = useState(() => {
    const stored = localStorage.getItem("users");
    if (stored) return JSON.parse(stored);
    return DEFAULT_USERS;
  });

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const login = (email, password) => {
    const user = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password
    );
    if (!user) {
      throw new Error("Invalid email or password");
    }
    setCurrentUser(user);
    return user;
  };

  const register = ({ name, email, password }) => {
    const existing = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (existing) {
      throw new Error("User with this email already exists");
    }
    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role: "user",
    };
    const updated = [...users, newUser];
    setUsers(updated);
    setCurrentUser(newUser);
    return newUser;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateProfile = (updates) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, ...updates };
    setCurrentUser(updatedUser);
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    updateProfile,
    isAdmin: currentUser?.role === "admin",
    isAuthenticated: !!currentUser,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

// 👇 THIS is what Header.jsx is trying to import
export const useAuth = () => useContext(AuthContext);
