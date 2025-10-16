"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Edit, Trash2, Plus, Eye, Loader2 } from "lucide-react";
import { getBlogs, deleteBlog } from "lib/actions";

// Import extracted components
import AdminPageHeader from "@/components/AdminPageHeader/AdminPageHeader.jsx";
import Button from "@/components/Button/Button.jsx";
import AdminActionButtons from "@/components/AdminActionButtons/AdminActionButtons.jsx";
import AdminTable from "@/components/AdminTable/AdminTable.jsx";

// --- Design System Configuration ---
const ACCENT = "#6495ED"; // Cornflower Blue
const PRIMARY_LIGHT = "#B0E0E6"; // Powder Blue
const DARK_TEXT = "#333333"; // Dark Gray
const BACKGROUND = "#FAFAFA"; // Off-White
const PRIMARY_LIGHT_TRANS = "#B0E0E680"; // PRIMARY_LIGHT with ~50% opacity for table header
const ACCENT_TRANS = "#6495ED1A"; // ACCENT with ~10% opacity for badge background
const RED_600 = "#DC2626"; // Equivalent Tailwind red-600
const RED_800 = "#991B1B"; // Equivalent Tailwind red-800
const BLUE_700 = "#1D4ED8"; // Equivalent Tailwind blue-700

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

  const handleDelete = async (blogId) => {
    if (
      confirm(
        "Êtes-vous sûr de vouloir supprimer cet article ? Cette action est irréversible.",
      )
    ) {
      try {
        const result = await deleteBlog(blogId);
        if (result.success) {
          // Refresh the list after successful deletion
          setBlogs((currentBlogs) =>
            currentBlogs.filter((blog) => blog.id !== blogId),
          );
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

  const columns = [
    { key: "title", label: "Titre" },
    {
      key: "category",
      label: "Catégorie",
      render: (value) => (
        // Category Badge - Subtle Accent Styling
        <span
          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
          style={{ backgroundColor: ACCENT_TRANS, color: ACCENT }}
        >
          {value}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Date",
      render: (value) => new Date(value).toLocaleDateString("fr-FR"),
    },
    {
      key: "views",
      label: "Vues",
      render: (value) => (
        <span className="font-medium text-gray-700">{value || 0}</span>
      ),
    },
  ];

  const actionButtons = [
    {
      key: "view",
      icon: Eye,
      href: (item) => `/admin/blogs/${item.id}`,
      // hover effect handled by AdminActionButtons utility
      className: `text-gray-600`,
      title: "Voir l'article",
    },
    {
      key: "edit",
      icon: Edit,
      href: (item) => `/admin/blogs/${item.id}/edit`,
      // hover effect handled by AdminActionButtons utility
      className: ``,
      title: "Modifier l'article",
    },
    {
      key: "delete",
      icon: Trash2,
      onClick: handleDelete,
      // hover effect handled by AdminActionButtons utility
      className: "",
      title: "Supprimer l'article",
    },
  ];

  return (
    // Main canvas background
    <main
      className="min-h-screen py-10 px-4 md:px-8"
      style={{ backgroundColor: BACKGROUND }}
    >
      <div className="max-w-7xl mx-auto">
        <AdminPageHeader
          title="Gestion des Articles"
          subtitle="Gérez vos articles et publications"
          actionButton={
            <Button
              href="/admin/blogs/new"
              className="inline-flex items-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              Nouvel Article
            </Button>
          }
        />

        {/* AdminTable container with scroll-reveal for animation */}
        <div className="scroll-reveal">
          <AdminTable
            columns={columns}
            data={blogs}
            renderActions={(item) => (
              <AdminActionButtons item={item} actions={actionButtons} />
            )}
            loading={loading}
          />
        </div>
      </div>
    </main>
  );
}
