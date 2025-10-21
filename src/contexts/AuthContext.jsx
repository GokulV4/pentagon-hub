import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isDebugMode, setIsDebugMode] = useState(false);

  // Check for existing session on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('pentagon_user');
    const savedRole = localStorage.getItem('pentagon_role');
    const savedDebugMode = localStorage.getItem('pentagon_debug_mode') === 'true';
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
      setUserRole(savedRole);
    }
    
    setIsDebugMode(savedDebugMode);
  }, []);

  const login = async (email, password) => {
    try {
      // Check hardcoded demo users first
      const mockUsers = {
        'admin@pentagon.com': { 
          id: 1, 
          name: 'Admin User', 
          email: 'admin@pentagon.com', 
          role: 'admin',
          avatar: null 
        },
        'member@pentagon.com': { 
          id: 2, 
          name: 'John Doe', 
          email: 'member@pentagon.com', 
          role: 'member',
          avatar: null 
        },
        'debug@pentagon.com': { 
          id: 999, 
          name: 'Debug Admin', 
          email: 'debug@pentagon.com', 
          role: 'debug',
          avatar: null 
        }
      };

      // Check hardcoded users first
      let userData = mockUsers[email];
      
      if (userData && password === 'password') {
        setUser(userData);
        setIsLoggedIn(true);
        setUserRole(userData.role);
        
        // Save to localStorage
        localStorage.setItem('pentagon_user', JSON.stringify(userData));
        localStorage.setItem('pentagon_role', userData.role);
        
        // Enable debug mode for debug user
        if (userData.role === 'debug') {
          setIsDebugMode(true);
          localStorage.setItem('pentagon_debug_mode', 'true');
        }
        
        return { success: true, user: userData };
      }

      // If not found in hardcoded users, check registered users
      const registeredUsers = JSON.parse(localStorage.getItem('pentagon_members') || '[]');
      console.log('Checking registered users:', registeredUsers);
      userData = registeredUsers.find(user => user.email === email);
      console.log('Found user data:', userData);
      
      if (userData) {
        // For registered users, check if they have a stored password or use default
        const storedPassword = userData.password || 'password';
        console.log('Stored password:', storedPassword, 'Input password:', password);
        if (password === storedPassword) {
          setUser(userData);
          setIsLoggedIn(true);
          setUserRole(userData.role);
          
          // Save to localStorage
          localStorage.setItem('pentagon_user', JSON.stringify(userData));
          localStorage.setItem('pentagon_role', userData.role);
          
          return { success: true, user: userData };
        }
      }

      return { success: false, error: 'Invalid credentials' };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  };

  const register = async (userData) => {
    try {
      // Simulate API call - replace with actual registration
      const newUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        role: 'member',
        avatar: null,
        registrationDate: new Date().toISOString(),
        paymentStatus: 'pending',
        ...userData
      };

      // Save to localStorage (in real app, this would be sent to server)
      const existingUsers = JSON.parse(localStorage.getItem('pentagon_members') || '[]');
      existingUsers.push(newUser);
      localStorage.setItem('pentagon_members', JSON.stringify(existingUsers));

      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, error: 'Registration failed' };
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setUserRole(null);
    setIsDebugMode(false);
    
    // Clear localStorage
    localStorage.removeItem('pentagon_user');
    localStorage.removeItem('pentagon_role');
    localStorage.removeItem('pentagon_debug_mode');
  };

  const toggleDebugMode = () => {
    const newDebugMode = !isDebugMode;
    setIsDebugMode(newDebugMode);
    localStorage.setItem('pentagon_debug_mode', newDebugMode.toString());
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('pentagon_user', JSON.stringify(updatedUser));
  };

  // Debug function to check stored users
  const debugUsers = () => {
    const registeredUsers = JSON.parse(localStorage.getItem('pentagon_members') || '[]');
    console.log('Registered users:', registeredUsers);
    return registeredUsers;
  };

  const value = {
    user,
    isLoggedIn,
    userRole,
    isDebugMode,
    login,
    register,
    logout,
    toggleDebugMode,
    updateUser,
    debugUsers
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
