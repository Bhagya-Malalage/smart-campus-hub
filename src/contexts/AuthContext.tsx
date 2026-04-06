import React, { createContext, useContext, useState, useCallback } from 'react';
import { Role, User, demoUsers } from '@/data/mock-data';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  role: Role;
  signIn: (role: Role) => void;
  signOut: () => void;
  switchRole: (role: Role) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const signIn = useCallback((role: Role) => {
    const u = demoUsers.find(du => du.role === role) || demoUsers[0];
    setUser(u);
  }, []);

  const signOut = useCallback(() => setUser(null), []);

  const switchRole = useCallback((role: Role) => {
    const u = demoUsers.find(du => du.role === role) || demoUsers[0];
    setUser(u);
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      role: user?.role || 'user',
      signIn,
      signOut,
      switchRole,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
