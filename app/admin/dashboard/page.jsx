"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import {
  Users,
  FileText,
  Mail,
  Eye,
  LogOut,
  FolderOpen,
  ThumbsUp,
  Loader2, // Imported for local utility
  AlertTriangle, // Imported for local utility
} from "lucide-react";
import { useStats } from "hooks/use-admin";
import { useAuth } from "hooks/use-project";
import { useToast } from "hooks/use-toast";
import Alert from "@/components/Alert/Alert";

// Dynamically import heavy components with loading spinners
const LoadingSpinner = dynamic(() => import("@/components/LoadingSpinner/LoadingSpinner"), {
  loading: () => <div className="flex justify-center items-center h-32"><Loader2 className="h-8 w-8 animate-spin" style={{ color: '#6495ED' }} /></div>
});

const AdminPageHeader = dynamic(() => import("@/components/AdminPageHeader/AdminPageHeader"), {
  loading: () => <div className="flex justify-center py-8"><Loader2 className="h-8 w-8 animate-spin" style={{ color: '#6495ED' }} /></div>
});

const ScrollReveal = dynamic(() => import("@/components/ScrollReveal/ScrollReveal"), {
  loading: () => null
});

const AdminStatsCard = dynamic(() => import("@/components/AdminStatsCard/AdminStatsCard"), {
  loading: () => <div className="bg-gray-100 p-6 rounded-2xl shadow-xl animate-pulse"><div className="h-16 bg-gray-200 rounded mb-4"></div><div className="h-8 bg-gray-200 rounded"></div></div>
});
// --- Design System Configuration ---
const ACCENT = '#6495ED';        // Cornflower Blue
const PRIMARY_LIGHT = '#B0E0E6'; // Powder Blue
const DARK_TEXT = '#333333';     // Dark Gray
const BACKGROUND = '#FAFAFA';    // Off-White




export default function Dashboard() {
  const router = useRouter();
  const { toast } = useToast();

  const { user, loading: authLoading, logout, isAuthenticated } = useAuth();
  const { stats, loading: statsLoading, error: statsError, refresh: refreshStats } = useStats();

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
      <div className={`bg-[${BACKGROUND}] min-h-screen flex justify-center items-start pt-20`}>
        <Alert message={statsError} />
      </div>
    );
  }

  if (authLoading || statsLoading || !stats || !user) {
    return (
      <div className={`bg-[${BACKGROUND}] min-h-screen flex justify-center items-center`}>
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
  } = stats;

  const getRandomCards = (userRole) => {
    const availableCards = [];

    // Articles card
    if (userRole === "super_admin" || userRole === "content_manager") {
      availableCards.push({
        key: "articles",
        title: "Total des articles",
        value: totalBlogs,
      });
    }

    // Projects card
    if (userRole === "super_admin" || userRole === "content_manager") {
      availableCards.push({
        key: "projects",
        title: "Projets actifs",
        value: stats.projectsCount || 0,
      });
    }

    // Messages card
    if (userRole === "super_admin" || userRole === "messages_manager") {
      availableCards.push({
        key: "messages",
        title: "Messages",
        value: totalMessages,
      });
    }

    // Views card
    if (userRole === "super_admin") {
      availableCards.push({
        key: "views",
        title: "Vues",
        value: totalViews,
      });
    }

    // Administrators card
    if (userRole === "super_admin") {
      availableCards.push({
        key: "admins",
        title: "Administrateurs",
        value: stats.adminsCount || 0,
      });
    }

    if (availableCards.length <= 4) {
      return availableCards;
    }

    const shuffled = [...availableCards].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 4);
  };

  const randomCards = getRandomCards(userRole);

  return (
    // Main canvas background
    <main className={`bg-[${BACKGROUND}] min-h-screen py-10 px-4 md:px-8`}>
      <div className="max-w-7xl mx-auto">
        <AdminPageHeader
          title="Tableau de bord"
          subtitle="Vue d'ensemble de votre plateforme"
          actionButton={
            <button
              onClick={handleLogout}
              // Primary Button Pattern
              className={`bg-[${ACCENT}] text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform shadow-xl hover:scale-[1.05] hover:shadow-2xl flex items-center`}
            >
              <LogOut className="h-5 w-5 mr-2" />
              Déconnexion
            </button>
          }
        />

        {/* Stats Cards - Blueprint responsive grid pattern with ScrollReveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {randomCards.map((card, index) => (
            <ScrollReveal key={`${card.key}-${index}`} delay={index * 0.1}>
              <AdminStatsCard
                title={card.title}
                value={card.value}
                type={card.key}
              />
            </ScrollReveal>
          ))}
        </div>

        {/* Recent Activity and Messages - Blueprint content sections with ScrollReveal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {(userRole === "super_admin" || userRole === "content_manager") && (
            <>
              {/* Recent Articles Card - Content Card Pattern */}
              <ScrollReveal>
                <div className="card-lift bg-white rounded-2xl shadow-xl overflow-hidden p-8 transition-all duration-300">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      {/* H2 Typography Style Applied to H2 */}
                      <h2
                        className={`text-4xl font-bold text-[${DARK_TEXT}] mb-2 pb-2`}
                        style={{ borderBottom: `3px solid ${ACCENT}` }}
                      >
                        Articles récents
                      </h2>
                      <p className="text-lg text-gray-600 mt-4">Dernières publications</p>
                    </div>
                    <Link
                      href="/admin/blogs"
                      // Primary Button Style for link
                      className={`bg-[${ACCENT}] text-white font-bold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                    >
                      Voir tous
                    </Link>
                  </div>

                  <div className="space-y-6">
                    {recentBlogs.map((blog, index) => (
                      <ScrollReveal key={blog.id} delay={index * 0.1}>
                        {/* Hover Lift Card for List Item */}
                        <div className="card-lift bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.01]">
                          <div className="flex items-center">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: PRIMARY_LIGHT }}>
                              <FileText className="h-6 w-6" style={{ color: ACCENT }} />
                            </div>
                            <div className="ml-5 flex-1">
                              <h3 className={`font-semibold text-[${DARK_TEXT}] mb-1`}>
                                {blog.title}
                              </h3>
                              <div className="flex justify-between items-center text-sm">
                                <p className="text-gray-600">{blog.date}</p>
                                <div className={`flex items-center text-gray-700 bg-[${PRIMARY_LIGHT}/50] px-3 py-1 rounded-full`}>
                                  <Eye className="h-4 w-4 mr-1" />
                                  {blog.views}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Recent Projects Card - Content Card Pattern */}
              <ScrollReveal delay={0.1}>
                <div className="card-lift bg-white rounded-2xl shadow-xl overflow-hidden p-8 transition-all duration-300">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      {/* H2 Typography Style Applied to H2 */}
                      <h2
                        className={`text-4xl font-bold text-[${DARK_TEXT}] mb-2 pb-2`}
                        style={{ borderBottom: `3px solid ${ACCENT}` }}
                      >
                        Projets récents
                      </h2>
                      <p className="text-lg text-gray-600 mt-4">Derniers projets ajoutés</p>
                    </div>
                    <Link
                      href="/admin/projects"
                      // Primary Button Style for link
                      className={`bg-[${ACCENT}] text-white font-bold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                    >
                      Voir tous
                    </Link>
                  </div>

                  <div className="space-y-6">
                    {stats.recentProjects?.map((project, index) => (
                      <ScrollReveal
                        key={project.id}
                        delay={index * 0.1}
                      >
                        {/* Hover Lift Card for List Item */}
                        <div className="card-lift bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.01]">
                          <div className="flex items-center">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: PRIMARY_LIGHT }}>
                              <FolderOpen className="h-6 w-6" style={{ color: ACCENT }} />
                            </div>
                            <div className="ml-5 flex-1">
                              <h3 className={`font-semibold text-[${DARK_TEXT}] mb-1`}>
                                {project.title}
                              </h3>
                              <div className="flex justify-between items-center text-sm">
                                <p className="text-gray-600">{project.date}</p>
                                {project.peopleHelped && (
                                  <div className={`flex items-center text-gray-700 bg-[${PRIMARY_LIGHT}/50] px-3 py-1 rounded-full`}>
                                    <Users className="h-4 w-4 mr-1" />
                                    {project.peopleHelped}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </ScrollReveal>
                    )) || (
                      <div className="text-center py-8 text-gray-600 font-medium">
                        Aucun projet récent
                      </div>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            </>
          )}

          {(userRole === "super_admin" || userRole === "messages_manager") && (
            // Recent Messages Card - Content Card Pattern
            <ScrollReveal delay={0.2}>
              <div className="card-lift bg-white rounded-2xl shadow-xl overflow-hidden p-8 transition-all duration-300">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    {/* H2 Typography Style Applied to H2 */}
                    <h2
                      className={`text-4xl font-bold text-[${DARK_TEXT}] mb-2 pb-2`}
                      style={{ borderBottom: `3px solid ${ACCENT}` }}
                    >
                      Messages récents
                    </h2>
                    <p className="text-lg text-gray-600 mt-4">Derniers messages reçus</p>
                  </div>
                  <Link
                    href="/admin/messages"
                    // Primary Button Style for link
                    className={`bg-[${ACCENT}] text-white font-bold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                  >
                    Voir tous
                  </Link>
                </div>

                <div className="space-y-6">
                  {stats.recentMessages.map((message, index) => (
                    <ScrollReveal
                      key={message.id}
                      delay={index * 0.1}
                    >
                      {/* Hover Lift Card for List Item */}
                      <div className="card-lift bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-[1.01]">
                        <div className="flex items-start">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: PRIMARY_LIGHT }}>
                            {/* Icon based on message type */}
                            {message.type === "donation" ? (
                              <ThumbsUp className="h-6 w-6" style={{ color: ACCENT }} />
                            ) : message.type === "volunteer" ? (
                              <Users className="h-6 w-6" style={{ color: ACCENT }} />
                            ) : (
                              <Mail className="h-6 w-6" style={{ color: ACCENT }} />
                            )}
                          </div>
                          <div className="ml-5 flex-1">
                            <h3 className={`font-semibold text-[${DARK_TEXT}] mb-1`}>
                              {message.name}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-1 mb-3">
                              {message.excerpt}
                            </p>
                            <div className="flex justify-between items-center text-sm">
                              <p className="text-gray-600">{message.date}</p>
                              {/* Accent Badge */}
                              <span className={`text-xs px-3 py-1 rounded-full font-medium bg-[${PRIMARY_LIGHT}/70] text-[${ACCENT}]`}>
                                {message.type === "donation"
                                  ? "Don"
                                  : message.type === "volunteer"
                                    ? "Bénévole"
                                    : "Contact"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}
        </div>
      </div>
    </main>
  );
}
