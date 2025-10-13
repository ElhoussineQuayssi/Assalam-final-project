"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login } from "lib/actions";
import { getSession } from "lib/auth";
import { AdminLoginForm } from "components/unified";
import { useToast } from "hooks/use-toast";

export default function AdminLogin() {
  const router = useRouter();
  const { toast } = useToast();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function checkSession() {
      try {
        // Use the getSession function instead of direct API call
        const session = await getSession();
        if (session && isMounted) {
          router.push("/admin/dashboard");
        } else if (isMounted) {
          setIsCheckingSession(false);
        }
      } catch (error) {
        console.error("Error checking session:", error);
        if (isMounted) setIsCheckingSession(false);
      }
    }
    checkSession();

    return () => {
      isMounted = false;
    };
  }, [router]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(event.target);

    try {
      const result = await login(formData);
      if (result.success) {
        toast({
          title: "Connexion réussie",
          description: "Vous êtes maintenant connecté à l'administration.",
        });
        router.push("/admin/dashboard");
      } else {
        setError(result.message || "Erreur de connexion. Vérifiez vos identifiants.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Une erreur inattendue s'est produite. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingSession) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <AdminLoginForm
      error={error}
      isLoading={isLoading}
      onSubmit={handleSubmit}
    />
  );
}
