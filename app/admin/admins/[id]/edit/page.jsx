"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getAdmins, updateAdmin } from "lib/actions";

export default function EditAdmin() {
  const router = useRouter();
  const { id } = useParams();
  const [formState, setFormState] = useState({
    status: "idle", // idle, submitting, success, error
    message: "",
  });
  const [admin, setAdmin] = useState({
    email: "",
    name: "",
    role: "super_admin",
    password: "",
  });

  useEffect(() => {
    async function fetchAdmin() {
      try {
        const result = await getAdmins();
        if (result.success) {
          const foundAdmin = result.data.find((a) => a.id.toString() === id);
          if (foundAdmin) {
            setAdmin({
              email: foundAdmin.email,
              name: foundAdmin.name,
              role: foundAdmin.role,
              password: "",
            });
          } else {
            setFormState({
              status: "error",
              message: "Administrateur introuvable.",
            });
          }
        } else {
          setFormState({
            status: "error",
            message: "Erreur lors de la récupération des administrateurs.",
          });
        }
      } catch (error) {
        setFormState({
          status: "error",
          message: `Une erreur s'est produite: ${error.message}`,
        });
      }
    }
    fetchAdmin();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState({ status: "submitting", message: "" });

    const formData = new FormData();
    formData.append("email", admin.email);
    formData.append("name", admin.name);
    formData.append("role", admin.role);
    if (admin.password) {
      formData.append("password", admin.password);
    }

    try {
      const result = await updateAdmin(id, formData);
      if (result.success) {
        setFormState({
          status: "success",
          message: result.message || "Administrateur mis à jour avec succès.",
        });
        router.push("/admin/admins");
      } else {
        setFormState({
          status: "error",
          message: result.message || "Erreur lors de la mise à jour.",
        });
      }
    } catch (error) {
      setFormState({
        status: "error",
        message: `Une erreur s'est produite: ${error.message}`,
      });
    }
  };

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Modifier l&apos;administrateur
      </h1>

      {formState.status === "error" && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-6">
          {formState.message}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-lg shadow"
      >
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={admin.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nom *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={admin.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Rôle *
          </label>
          <select
            id="role"
            name="role"
            value={admin.role}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="super_admin">Super Admin</option>
            <option value="content_manager">Content Manager</option>
            <option value="message_manager">Message Manager</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nouveau mot de passe (laisser vide pour ne pas changer)
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={admin.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="********"
          />
        </div>

        <button
          type="submit"
          disabled={formState.status === "submitting"}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-70"
        >
          {formState.status === "submitting"
            ? "Mise à jour..."
            : "Mettre à jour"}
        </button>
      </form>
    </div>
  );
}
