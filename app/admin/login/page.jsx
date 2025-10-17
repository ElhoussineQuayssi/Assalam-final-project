"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/actions";
import { getSession } from "@/lib/auth";
import { useToast } from "hooks/use-toast";
import { Loader2, AlertTriangle } from "lucide-react";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import Alert from "@/components/Alert/Alert";
import Button from "@/components/Button/Button";
import AdminLoginForm from "@/components/AdminLoginForm/AdminLoginForm";

// --- Design System Configuration ---
const ACCENT = "#6495ED"; // Cornflower Blue
const DARK_TEXT = "#333333"; // Dark Gray
const BACKGROUND = "#FAFAFA"; // Off-White

// --- Main Component ---
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
        setError(
          result.message || "Erreur de connexion. Vérifiez vos identifiants.",
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Une erreur inattendue s'est produite. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingSession) {
    // Uses the styled LoadingSpinner utility
    return <LoadingSpinner />;
  }

  // Uses the locally re-implemented AdminLoginForm component with Design System styles
  return (
    <AdminLoginForm
      error={error}
      isLoading={isLoading}
      onSubmit={handleSubmit}
    />
  );
}
