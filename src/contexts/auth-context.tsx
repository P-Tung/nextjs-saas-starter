"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  onAuthStateChanged,
  User,
  UserInfo,
} from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase/client";
import { isFirebaseConfigured } from "@/lib/firebase/config";

export interface AppUser extends User {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  providerData: UserInfo[];
}

export interface AuthState {
  user: AppUser | null;
  loading: boolean;
  configured: boolean;
}

interface AuthContextType extends AuthState {
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    configured: isFirebaseConfigured(),
  });

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      setAuthState((prev) => ({ ...prev, loading: false }));
      return;
    }

    const auth = getFirebaseAuth();
    if (!auth) {
      setAuthState((prev) => ({ ...prev, loading: false }));
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthState({
        user: user as AppUser | null,
        loading: false,
        configured: true,
      });
    });

    return () => unsubscribe();
  }, []);

  const refreshUser = async () => {
    const auth = getFirebaseAuth();
    if (auth?.currentUser) {
      await auth.currentUser.reload();
      setAuthState((prev) => ({
        ...prev,
        user: auth?.currentUser as AppUser | null,
      }));
    }
  };

  return (
    <AuthContext.Provider value={{ ...authState, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function useUser() {
  const { user, loading } = useAuth();
  return { user, loading };
}

export function useIsAuthenticated() {
  const { user, loading } = useAuth();
  return !loading && !!user;
}