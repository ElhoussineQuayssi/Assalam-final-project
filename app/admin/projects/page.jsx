"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Eye, Calendar, MapPin, Users } from "lucide-react";
import { getProjects, deleteProject } from "lib/actions";
import { formatDate } from "lib/utils";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const result = await getProjects();
      if (result.success) {
        setProjects(result.data);
      } else {
        console.error("Error loading projects:", result.message);
      }
    } catch (error) {
      console.error("Error loading projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const truncateText = (text, maxLength = 50) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des Projets</h1>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-300"
        >
          <Plus className="h-4 w-4" />
          Nouveau Projet
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="text-gray-400 mb-4">
            <Plus className="h-24 w-24 mx-auto" />
          </div>
          <h2 className="text-xl font-semibold text-gray-600 mb-2">Aucun projet trouvé</h2>
          <p className="text-gray-500 mb-6">
            Commencez par créer votre premier projet en utilisant le bouton ci-dessus.
          </p>
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors duration-300"
          >
            <Plus className="h-4 w-4" />
            Créer le Premier Projet
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      {project.title}
                    </h2>
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {truncateText(project.excerpt, 50)}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.categories?.map((category) => (
                        <span
                          key={category}
                          className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Link
                      href={`/projects/${project.slug}`}
                      target="_blank"
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Voir le projet"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`/admin/projects/${project.id}/edit`}
                      className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                      title="Modifier"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <button
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      title="Supprimer"
                      onClick={async () => {
                        if (confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) {
                          try {
                            const result = await deleteProject(project.id);
                            if (result.success) {
                              // Refresh the projects list
                              loadProjects();
                              alert("Projet supprimé avec succès!");
                            } else {
                              alert(result.message || "Erreur lors de la suppression du projet");
                            }
                          } catch (error) {
                            console.error("Error deleting project:", error);
                            alert("Erreur lors de la suppression du projet");
                          }
                        }
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Créé le {formatDate(project.createdAt)}</span>
                  </div>
                  {project.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{project.location}</span>
                    </div>
                  )}
                  {project.peopleHelped && (
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{project.peopleHelped} bénéficiaires</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        project.status === "Actif"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {project.status || "Actif"}
                      </span>
                      <span className="text-gray-500">
                        {project.content?.length || 0} sections de contenu
                      </span>
                      {project.goals?.length > 0 && (
                        <span className="text-gray-500">
                          {project.goals.length} objectif{project.goals.length > 1 ? "s" : ""}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-400">
                      ID: {project.id}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary Stats */}
      {projects.length > 0 && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {projects.length}
            </div>
            <div className="text-gray-600">Projets Total</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">
              {projects.filter(p => p.status === "Actif").length}
            </div>
            <div className="text-gray-600">Projets Actifs</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-2">
              {projects.reduce((acc, p) => acc + (p.peopleHelped ? parseInt(p.peopleHelped) || 0 : 0), 0)}
            </div>
            <div className="text-gray-600">Bénéficiaires Total</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-2">
              {projects.reduce((acc, p) => acc + (p.content?.length || 0), 0)}
            </div>
            <div className="text-gray-600">Sections de Contenu</div>
          </div>
        </div>
      )}
    </div>
  );
}
