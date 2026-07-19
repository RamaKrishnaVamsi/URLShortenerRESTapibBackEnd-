import { createContext, useContext, useState,type ReactNode, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  memberSince: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initial auth check: reuse token if still valid
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setUser(null);
          return;
        }

        const response = await api.get('/auth/user');
        const currentUser = response.data;
        setUser(currentUser);
        localStorage.setItem('user', JSON.stringify(currentUser));
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setUser(user);

    toast.success("Login Successful");
  } catch (error: any) {
    console.log(error.message);
    console.log("Status:", error.response?.status);
    // console.log("Data:", error.response?.data);
    console.log("Message:", error.message);

    toast.error(
      error.response?.data?.message || "Login Failed"
    );

    throw error;
  }
};

  const register = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      const { token, user: newUser } = response.data;
      if (token && newUser) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(newUser));
        setUser(newUser);
      }

      toast.success("Registration Successful");
      return response.data;
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Registration Failed"
      );

      throw error;
    }
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     const dummyUser = {
    //       id: '1',
    //       name,
    //       email,
    //       memberSince: new Date().toISOString(),
    //       avatar: `https://i.pravatar.cc/150?u=${name}`,
    //     };
    //     setUser(dummyUser);
    //     localStorage.setItem('user', JSON.stringify(dummyUser));
    //     toast.success('Registration successful!');
    //     resolve();
    //   }, 1500);
    // });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    console.log("jrfdkcxss")
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
