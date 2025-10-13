"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getMessages } from "lib/actions";
import { AlertTriangle } from "lucide-react";

export default function ViewMessage() {
  const { id } = useParams();
  const router = useRouter();
  const [message, setMessage] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMessage() {
      try {
        const result = await getMessages();
        if (result.success) {
          const foundMessage = result.data.find((m) => m.id === parseInt(id));
          if (foundMessage) {
            setMessage(foundMessage);
          } else {
            setError("Message introuvable.");
          }
        } else {
          setError(
            result.message || "Erreur lors de la récupération du message.",
          );
        }
      } catch (err) {
        setError(
          `Une erreur s'est produite: ${err.message}. Veuillez réessayer.`,
        );
      }
    }
    fetchMessage();
  }, [id]);

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 flex items-start">
          <AlertTriangle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!message) {
    return <div className="p-8">Chargement...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Détails du message</h1>
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div>
          <p className="text-sm text-gray-500">Nom</p>
          <p className="text-lg font-medium">{message.name}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="text-lg font-medium">{message.email}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Téléphone</p>
          <p className="text-lg font-medium">{message.phone || "N/A"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Type</p>
          <p className="text-lg font-medium">{message.type}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Message</p>
          <p className="text-lg font-medium">{message.message}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Date</p>
          <p className="text-lg font-medium">{message.createdAt}</p>
        </div>
        <button
          onClick={() => router.push("/admin/messages")}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
        >
          Retour à la liste des messages
        </button>
      </div>
    </div>
  );
}
