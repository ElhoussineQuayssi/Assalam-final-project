"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Edit, Trash2, Plus, Eye } from "lucide-react";
import { getBlogs, deleteBlog } from "lib/actions";
import {
  AdminPageHeader,
  AdminTable,
  AdminActionButtons,
  Button,
} from "components/unified";

export default function BlogsAdmin() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      setLoading(true);
      try {
        const result = await getBlogs();
        if (result.success) {
          setBlogs(result.data);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  const columns = [
    { key: "title", label: "Titre" },
    { key: "category", label: "Catégorie" },
    {
      key: "createdAt",
      label: "Date",
      render: (value) => new Date(value).toLocaleDateString('fr-FR')
    },
    {
      key: "views",
      label: "Vues",
      render: (value) => value || 0
    },
  ];

  const handleDelete = async (blogId) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      try {
        const result = await deleteBlog(blogId);
        if (result.success) {
          // Refresh the list after successful deletion
          const blogsResult = await getBlogs();
          if (blogsResult.success) {
            setBlogs(blogsResult.data);
          }
        } else {
          console.error("Error deleting blog:", result.message);
          alert("Erreur lors de la suppression: " + result.message);
        }
      } catch (error) {
        console.error("Error deleting blog:", error);
        alert("Une erreur s'est produite lors de la suppression.");
      }
    }
  };

  const actionButtons = [
    {
      key: "view",
      icon: Eye,
      href: (item) => `/admin/blogs/${item.id}`,
      className: "text-gray-600 hover:text-gray-900",
      title: "Voir"
    },
    {
      key: "edit",
      icon: Edit,
      href: (item) => `/admin/blogs/${item.id}/edit`,
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
        title="Gestion des Articles"
        actionButton={
          <Button href="/admin/blogs/new" variant="primary">
            <Plus className="h-5 w-5 mr-2" />
            Nouvel Article
          </Button>
        }
      />

      <AdminTable
        columns={columns}
        data={blogs}
        renderActions={(item) => (
          <AdminActionButtons item={item} actions={actionButtons} />
        )}
        loading={loading}
      />
    </div>
  );
}
