import React, { createContext, useContext, useState, useEffect } from 'react';

// Define user type
export type UserType = 'volunteer' | 'family';

// Define user data type
export interface UserData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  userType: UserType;
  
  // Volunteer specific fields
  volunteerType?: 'individual' | 'ngo';
  organization?: string;
  role?: string;
  skills?: string;
  availability?: string;
  
  // Family specific fields
  martyrName?: string;
  relationship?: string;
  martyrRank?: string;
  martyrUnit?: string;
  address?: string;
  district?: string;
  state?: string;
  pincode?: string;
}

interface AuthContextType {
  user: UserData | null;
  isAuthenticated: boolean;
  login: (userData: UserData) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check for existing user in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse stored user data:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = (userData: UserData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 