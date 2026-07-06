// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/authAPI';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('GUEST'); // 'GUEST', 'USER', 'ADMIN'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore session
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedRole = localStorage.getItem('user_role');
    const storedEmail = localStorage.getItem('user_email');
    const storedToken = localStorage.getItem('user_token');
    const storedName = localStorage.getItem('user_name') || 'User';

    if (storedAuth === 'true' && storedRole) {
      setRole(storedRole);
      setUser({
        id: storedToken,
        email: storedEmail,
        name: storedName,
        role: storedRole
      });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // Mock logins first
      if (email === 'admin@cendekia.com' && password === 'admin123') {
        const adminUser = {
          id: 'admin-mock-id',
          email: 'admin@cendekia.com',
          name: 'Admin Cendekia',
          role: 'ADMIN'
        };
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user_role', 'ADMIN');
        localStorage.setItem('user_email', 'admin@cendekia.com');
        localStorage.setItem('user_token', 'admin-mock-id');
        localStorage.setItem('user_name', 'Admin Cendekia');
        setUser(adminUser);
        setRole('ADMIN');
        return adminUser;
      }

      if (email === 'pelanggan@cendekia.com' && password === 'pelanggan123') {
        const customerUser = {
          id: 'CEND-001', // Link to Budi Santoso in mock data or a standard mock profile
          email: 'pelanggan@cendekia.com',
          name: 'Budi Santoso',
          role: 'USER'
        };
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user_role', 'USER');
        localStorage.setItem('user_email', 'pelanggan@cendekia.com');
        localStorage.setItem('user_token', 'CEND-001');
        localStorage.setItem('user_name', 'Budi Santoso');
        setUser(customerUser);
        setRole('USER');
        return customerUser;
      }

      // Try Supabase auth
      const supabaseUser = await authAPI.login(email, password);
      // Fetch details from customer database to see if admin
      let userRole = 'USER';
      let userName = email.split('@')[0];
      
      try {
        const details = await authAPI.fetchCustomerById(supabaseUser.id);
        if (details) {
          userName = details.nama_pelanggan;
          // Determine if admin (e.g. check if email contains admin/cendekia admin prefix, or custom flag)
          if (details.email === 'admin@cendekia.com' || details.status_pelanggan === 'Admin') {
            userRole = 'ADMIN';
          }
        }
      } catch (err) {
        console.log("No profile record found in customers table, assuming default user role.");
      }

      const activeUser = {
        id: supabaseUser.id,
        email: supabaseUser.email,
        name: userName,
        role: userRole
      };

      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user_role', userRole);
      localStorage.setItem('user_email', supabaseUser.email);
      localStorage.setItem('user_token', supabaseUser.id);
      localStorage.setItem('user_name', userName);

      setUser(activeUser);
      setRole(userRole);
      return activeUser;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_token');
    localStorage.removeItem('user_name');
    setUser(null);
    setRole('GUEST');
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
