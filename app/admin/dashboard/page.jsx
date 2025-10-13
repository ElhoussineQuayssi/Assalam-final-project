"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Alert, LoadingSpinner, StatsCard } from "components/unified";
import {
  Users,
  FileText,
  Mail,
  Eye,
  LogOut,
  FolderOpen,
  ThumbsUp,
} from "lucide-react";
import { useStats } from "hooks/use-admin";
import { useAuth } from "hooks/use-project";
import { useToast } from "hooks/use-toast";

export default function Dashboard() {
  const router = useRouter();
  const { toast } = useToast();

  // Use authentication hook for session management
  const { user, loading: authLoading, logout, isAuthenticated } = useAuth();

  // Use stats hook for dashboard data with real-time updates
  const { stats, loading: statsLoading, error: statsError, refresh: refreshStats } = useStats();

  // Redirect to login if not authenticated
  if (!authLoading && !isAuthenticated) {
    router.push("/admin/login");
    return null;
  }

  const handleLogout = async () => {
    try {
      const success = await logout();
      if (success) {
        toast({
          title: "Déconnexion réussie",
          description: "Vous avez été déconnecté avec succès.",
        });
        router.push("/admin/login");
      } else {
        toast({
          title: "Erreur",
          description: "Erreur lors de la déconnexion. Veuillez réessayer.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la déconnexion.",
        variant: "destructive",
      });
    }
  };

  if (statsError) {
    return (
      <div className="flex justify-center items-center h-full">
        <Alert type="error" message={statsError} />
      </div>
    );
  }

  if (authLoading || statsLoading || !stats || !user) {
    return (
      <div className="flex justify-center items-center h-full">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  const userRole = user.role;

  const {
    totalBlogs,
    newBlogsPercent,
    totalMessages,
    newMessagesPercent,
    totalViews,
    viewsChangePercent,
    recentBlogs,
    recentMessages,
  } = stats;

  // Function to randomly select 4 out of 5 cards
  const getRandomCards = (userRole) => {
    const availableCards = [];

    // Articles card
    if (userRole === "super_admin" || userRole === "content_manager") {
      availableCards.push({
        key: "articles",
        component: (
          <StatsCard
            title="Total des articles"
            value={totalBlogs}
            change={newBlogsPercent}
            changeText="depuis le mois dernier"
            icon={FileText}
            color="blue"
          />
        )
      });
    }

    // Projects card
    if (userRole === "super_admin" || userRole === "content_manager") {
      availableCards.push({
        key: "projects",
        component: (
          <StatsCard
            title="Projets actifs"
            value={stats.projectsCount || 0}
            icon={FolderOpen}
            color="orange"
          />
        )
      });
    }

    // Messages card
    if (userRole === "super_admin" || userRole === "messages_manager") {
      availableCards.push({
        key: "messages",
        component: (
          <StatsCard
            title="Messages"
            value={totalMessages}
            change={newMessagesPercent}
            changeText="depuis le mois dernier"
            icon={Mail}
            color="slate"
          />
        )
      });
    }

    // Views card
    if (userRole === "super_admin") {
      availableCards.push({
        key: "views",
        component: (
          <StatsCard
            title="Vues"
            value={totalViews}
            change={viewsChangePercent}
            changeText="depuis le mois dernier"
            icon={Eye}
            color="red"
          />
        )
      });
    }

    // Administrators card
    if (userRole === "super_admin") {
      availableCards.push({
        key: "admins",
        component: (
          <StatsCard
            title="Administrateurs"
            value={stats.adminsCount || 0}
            icon={Users}
            color="purple"
          />
        )
      });
    }

    // If we have 4 or fewer cards, show all of them
    if (availableCards.length <= 4) {
      return availableCards;
    }

    // Randomly select 4 cards from the available ones
    const shuffled = [...availableCards].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 4);
  };

  const randomCards = getRandomCards(userRole);

  return (
    <div className="flex-1 overflow-auto bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="p-8">
        <div className="flex justify-between items-center mb-8 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Tableau de bord</h1>
            <p className="text-gray-600 mt-1">Vue d'ensemble de votre plateforme</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium py-3 px-6 rounded-xl flex items-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Déconnexion
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {randomCards.map((card, index) => (
            <div
              key={`${card.key}-${index}`}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl border border-white/30 p-6 h-full transform hover:-translate-y-2 transition-all duration-300"
            >
              {card.component}
            </div>
          ))}
        </div>

        {/* Recent Activity and Messages */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {(userRole === "super_admin" || userRole === "content_manager") && (
            <>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/30 p-8 hover:shadow-2xl transition-all duration-300">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                      Articles récents
                    </h2>
                    <p className="text-gray-600 mt-1">Dernières publications</p>
                  </div>
                  <Link
                    href="/admin/blogs"
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    Voir tous
                  </Link>
                </div>

                <div className="space-y-6">
                  {recentBlogs.map((blog) => (
                    <div
                      key={blog.id}
                      className="group flex items-center p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <FileText className="h-7 w-7 text-blue-600" />
                      </div>
                      <div className="ml-5 flex-1">
                        <h3 className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors duration-200">
                          {blog.title}
                        </h3>
                        <div className="flex justify-between items-center mt-2">
                          <p className="text-sm text-gray-500">{blog.date}</p>
                          <div className="flex items-center text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                            <Eye className="h-4 w-4 mr-1" />
                            {blog.views}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/30 p-8 hover:shadow-2xl transition-all duration-300">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                      Projets récents
                    </h2>
                    <p className="text-gray-600 mt-1">Derniers projets ajoutés</p>
                  </div>
                  <Link
                    href="/admin/projects"
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    Voir tous
                  </Link>
                </div>

                <div className="space-y-6">
                  {stats.recentProjects?.map((project) => (
                    <div
                      key={project.id}
                      className="group flex items-center p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <FolderOpen className="h-7 w-7 text-orange-600" />
                      </div>
                      <div className="ml-5 flex-1">
                        <h3 className="font-semibold text-gray-800 group-hover:text-orange-700 transition-colors duration-200">
                          {project.title}
                        </h3>
                        <div className="flex justify-between items-center mt-2">
                          <p className="text-sm text-gray-500">{project.date}</p>
                          {project.peopleHelped && (
                            <div className="flex items-center text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                              <Users className="h-4 w-4 mr-1" />
                              {project.peopleHelped}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )) || (
                    <div className="text-center py-8 text-gray-500">
                      Aucun projet récent
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {(userRole === "super_admin" || userRole === "messages_manager") && (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/30 p-8 hover:shadow-2xl transition-all duration-300">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Messages récents
                  </h2>
                  <p className="text-gray-600 mt-1">Derniers messages reçus</p>
                </div>
                <Link
                  href="/admin/messages"
                  className="bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Voir tous
                </Link>
              </div>

              <div className="space-y-6">
                {recentMessages.map((message) => (
                  <div
                    key={message.id}
                    className="group flex items-start p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:border-slate-200 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all duration-300 ${
                        message.type === "donation"
                          ? "bg-gradient-to-br from-red-100 to-red-200"
                          : message.type === "volunteer"
                            ? "bg-gradient-to-br from-slate-100 to-slate-200"
                            : "bg-gradient-to-br from-gray-100 to-gray-200"
                      }`}
                    >
                      {message.type === "donation" ? (
                        <ThumbsUp className="h-7 w-7 text-red-600" />
                      ) : message.type === "volunteer" ? (
                        <Users className="h-7 w-7 text-slate-600" />
                      ) : (
                        <Mail className="h-7 w-7 text-gray-600" />
                      )}
                    </div>
                    <div className="ml-5 flex-1">
                      <h3 className="font-semibold text-gray-800 group-hover:text-slate-700 transition-colors duration-200">
                        {message.name}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-1 mt-1">
                        {message.excerpt}
                      </p>
                      <div className="flex justify-between items-center mt-3">
                        <p className="text-sm text-gray-500">{message.date}</p>
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-medium transition-all duration-200 ${
                            message.type === "donation"
                              ? "bg-gradient-to-r from-red-100 to-red-200 text-red-700"
                              : message.type === "volunteer"
                                ? "bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700"
                                : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700"
                          }`}
                        >
                          {message.type === "donation"
                            ? "Don"
                            : message.type === "volunteer"
                              ? "Bénévole"
                              : "Contact"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
