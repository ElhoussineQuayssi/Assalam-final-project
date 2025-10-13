"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createAdmin } from "lib/actions";
import { AlertTriangle } from "lucide-react";

export default function NewAdmin() {
  const router = useRouter();
  const [formState, setFormState] = useState({
    status: "idle", // idle, submitting, success, error
    message: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormState({ ...formState, status: "submitting", message: "" });

    const formData = new FormData(event.target);

    try {
      const result = await createAdmin(formData);
      if (result.success) {
        router.push("/admin/admins");
      } else {
        setFormState({
          ...formState,
          status: "error",
          message:
            result.message || "Une erreur s'est produite. Veuillez réessayer.",
        });
      }
    } catch (error) {
      console.error("Failed to create admin:", error);
      setFormState({
        ...formState,
        status: "error",
        message: "Une erreur s'est produite. Veuillez réessayer.",
      });
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Ajouter un administrateur</h1>
      </div>

      {formState.status === "error" && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-6 flex items-start">
          <AlertTriangle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <p>{formState.message}</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow p-6 space-y-6"
      >
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="name"
          >
            Nom *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="email"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="password"
          >
            Mot de passe *
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-1"
            htmlFor="role"
          >
            Rôle *
          </label>
          <select
            id="role"
            name="role"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="super_admin">Super Administrateur</option>
            <option value="content_manager">Gestionnaire de contenu</option>
            <option value="messages_manager">Gestionnaire des messages</option>
          </select>
        </div>

        <div>
          <button
            type="submit"
            disabled={formState.status === "submitting"}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 disabled:opacity-70"
          >
            {formState.status === "submitting"
              ? "Ajout en cours..."
              : "Ajouter l'administrateur"}
          </button>
        </div>
      </form>
    </div>
  );
}
