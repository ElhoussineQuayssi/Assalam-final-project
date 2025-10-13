"use client";

import { useAuth } from "hooks/use-project";
import { useLocalStorage } from "hooks/use-enhanced";
import { useToast } from "hooks/use-toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({ children }) {
  const { user, loading, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  // User preferences with localStorage persistence
  const [theme, setTheme] = useLocalStorage('adminTheme', 'light');

  // Redirect to login if not authenticated (but only if we're not already on login page)
  useEffect(() => {
    if (!loading && !isAuthenticated && !window.location.pathname.includes('/login')) {
      toast({
        title: "Accès refusé",
        description: "Vous devez vous connecter pour accéder à l'administration.",
        variant: "destructive",
      });
      router.push("/admin/login");
    }
  }, [loading, isAuthenticated, router, toast]);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  // Check if we're on the login page
  const isLoginPage = typeof window !== 'undefined' && window.location.pathname === '/admin/login';

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated && !isLoginPage) {
    return null; // Will redirect via useEffect
  }

  // If not authenticated and on login page, just render children (login page)
  if (!isAuthenticated && isLoginPage) {
    return <>{children}</>;
  }

  // For authenticated users, render children directly - sidebars are handled by individual section layouts
  return <>{children}</>;
}
