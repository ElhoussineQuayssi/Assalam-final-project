"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAdmins, deleteAdmin } from "lib/actions";
import { Users, AlertTriangle, Edit, Trash2, Search } from "lucide-react";
import {
  AdminPageHeader,
  AdminTable,
  AdminActionButtons,
  Alert,
  Button,
} from "components/unified";
import { usePagination, useSearch } from "hooks/use-admin";
import { useToast } from "hooks/use-toast";

export default function AdminsPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [admins, setAdmins] = useState([]);
  const [error, setError] = useState("");
  const [filteredAdmins, setFilteredAdmins] = useState([]);

  // Use search hook for filtering admins
  const { query, debouncedQuery, setQuery, clearSearch } = useSearch('', 300);

  // Use pagination hook
  const {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    hasNextPage,
    hasPrevPage,
    goToPage,
    nextPage,
    prevPage,
    getVisiblePages,
    setCurrentPage,
  } = usePagination(admins.length, 10);

  useEffect(() => {
    async function fetchAdmins() {
      try {
        const result = await getAdmins();
        if (result.success) {
          setAdmins(result.data);
        } else {
          setError(
            result.message ||
              "Erreur lors de la récupération des administrateurs.",
          );
        }
      } catch {
        setError("Une erreur s'est produite. Veuillez réessayer.");
      }
    }
    fetchAdmins();
  }, []);

  // Filter admins based on search query
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setFilteredAdmins(admins);
    } else {
      const filtered = admins.filter(admin =>
        admin.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        admin.email.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        admin.role.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
      setFilteredAdmins(filtered);
    }
  }, [admins, debouncedQuery]);

  // Update pagination when filtered data changes
  useEffect(() => {
    setCurrentPage(1); // Reset to first page when search changes
  }, [debouncedQuery, setCurrentPage]);

  const handleDelete = async (adminId) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet administrateur ?")) {
      try {
        const result = await deleteAdmin(adminId);
        if (result.success) {
          const updatedAdmins = admins.filter((admin) => admin.id !== adminId);
          setAdmins(updatedAdmins);
          toast({
            title: "Administrateur supprimé",
            description: "L'administrateur a été supprimé avec succès.",
          });
        } else {
          toast({
            title: "Erreur",
            description: result.message || "Erreur lors de la suppression.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error deleting admin:", error);
        toast({
          title: "Erreur",
          description: "Une erreur s'est produite lors de la suppression.",
          variant: "destructive",
        });
      }
    }
  };

  // Get paginated data
  const paginatedAdmins = filteredAdmins.slice(startIndex, endIndex);

  const columns = [
    {
      key: "name",
      label: "Nom",
      render: (value, item) => (
        <div>
          <p className="font-medium">{value}</p>
          <p className="text-sm text-gray-500">{item.email}</p>
        </div>
      ),
    },
    {
      key: "role",
      label: "Rôle",
      render: (value) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value === "super_admin"
            ? "bg-red-100 text-red-800"
            : value === "content_manager"
              ? "bg-blue-100 text-blue-800"
              : "bg-gray-100 text-gray-800"
        }`}>
          {value === "super_admin" ? "Super Admin" :
           value === "content_manager" ? "Gestionnaire Contenu" :
           value === "messages_manager" ? "Gestionnaire Messages" : value}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Date de création",
      render: (value) => new Date(value).toLocaleDateString('fr-FR')
    },
    {
      key: "status",
      label: "Statut",
      render: (value) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value === "active"
            ? "bg-green-100 text-green-800"
            : "bg-gray-100 text-gray-800"
        }`}>
          {value === "active" ? "Actif" : "Inactif"}
        </span>
      ),
    },
  ];

  const actionButtons = [
    {
      key: "edit",
      icon: Edit,
      href: (item) => `/admin/admins/${item.id}/edit`,
      className: "text-blue-600 hover:text-blue-900",
      title: "Modifier"
    },
    {
      key: "delete",
      icon: Trash2,
      onClick: handleDelete,
      className: "text-red-600 hover:text-red-900",
      title: "Supprimer"
    },
  ];

  return (
    <div className="p-4 md:p-8">
      <AdminPageHeader
        title="Gestion des Administrateurs"
        subtitle="Gérez les comptes administrateurs et leurs permissions"
        actionButton={
          <Button href="/admin/admins/new" variant="primary">
            <Users className="h-5 w-5 mr-2" />
            Nouvel Admin
          </Button>
        }
      />

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par nom, email ou rôle..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {query && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              title="Effacer la recherche"
            >
              ×
            </button>
          )}
        </div>
        {debouncedQuery && (
          <p className="text-sm text-gray-600 mt-2">
            {filteredAdmins.length} résultat{filteredAdmins.length > 1 ? 's' : ''} pour "{debouncedQuery}"
          </p>
        )}
      </div>

      {error && (
        <Alert
          type="error"
          message={error}
          className="mb-6"
        />
      )}

      <AdminTable
        columns={columns}
        data={paginatedAdmins}
        renderActions={(item) => (
          <AdminActionButtons item={item} actions={actionButtons} />
        )}
      />

      {/* Pagination */}
      {filteredAdmins.length > 0 && (
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-600">
            Affichage de {startIndex + 1} à {Math.min(endIndex, filteredAdmins.length)} sur {filteredAdmins.length} administrateurs
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prevPage}
              disabled={!hasPrevPage}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Précédent
            </button>

            <div className="flex items-center gap-1">
              {getVisiblePages().map((page, index) => (
                <button
                  key={index}
                  onClick={() => typeof page === 'number' ? goToPage(page) : null}
                  disabled={page === '...'}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    page === currentPage
                      ? 'bg-blue-600 text-white'
                      : page === '...'
                        ? 'text-gray-700 cursor-default'
                        : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={nextPage}
              disabled={!hasNextPage}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Suivant
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
