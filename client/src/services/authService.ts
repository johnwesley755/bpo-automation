
import { LoginCredentials, AuthResponse } from "@/types/auth.types";

// Mock implementation for demo purposes
export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // For demo purposes, we'll accept any credentials
    // In a real app, this would call the backend API
    if (credentials.email && credentials.password) {
      // Mock successful login
      const mockResponse: AuthResponse = {
        token: "mock-jwt-token",
        user: {
          id: "1",
          email: credentials.email,
          name: "Demo User",
        },
      };
      
      localStorage.setItem("token", mockResponse.token);
      localStorage.setItem("user", JSON.stringify(mockResponse.user));
      
      return mockResponse;
    }
    
    throw new Error("Invalid credentials");
  },

  logout: (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("token");
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  },

  // Add this to your existing authService

  signup: async (userData: { name: string; email: string; password: string }): Promise<void> => {
    // For demo purposes, we'll just simulate a successful signup
    // In a real app, this would call the backend API
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, you would send the user data to your backend
    console.log("User registered:", userData);
    
    // For demo, we won't actually store this user data
    return Promise.resolve();
  },
};