"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Newspaper,
  MessageSquare,
  Users,
  LayoutDashboard,
  LogOut,
  FolderOpen,
  Home,
} from "lucide-react";

export default function AdminSidebar({ user }) {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Tableau de Bord",
      href: "/admin/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      permission: ["super_admin", "content_manager", "message_manager"],
    },
    {
      name: "Articles",
      href: "/admin/blogs",
      icon: <Newspaper className="h-5 w-5" />,
      permission: ["super_admin", "content_manager"],
    },
    {
      name: "Projets",
      href: "/admin/projects",
      icon: <FolderOpen className="h-5 w-5" />,
      permission: ["super_admin", "content_manager"],
    },
    {
      name: "Messages",
      href: "/admin/messages",
      icon: <MessageSquare className="h-5 w-5" />,
      permission: ["super_admin", "message_manager"],
    },
    {
      name: "Administrateurs",
      href: "/admin/admins",
      icon: <Users className="h-5 w-5" />,
      permission: ["super_admin"],
    },
  ];

  // Filter nav items based on user role with updated logic
  const filteredNavItems = navItems.filter((item) => {
    if (user?.role === "content_manager") {
      // content_manager: show dashboard, articles, and projects
      return item.name === "Tableau de Bord" || item.name === "Articles" || item.name === "Projets";
    } else if (user?.role === "message_manager") {
      // message_manager: show only messages
      return item.name === "Messages";
    } else if (user?.role === "super_admin") {
      // super_admin: show all
      return true;
    }
    // default: no access
    return false;
  });

  return (
    <aside className="w-64 bg-[var(--surface)] shadow-[var(--shadow-md)] h-screen sticky top-0 border-r border-[var(--border)]">
      <div className="p-8 border-b border-[var(--border)] bg-[var(--bg)]">
        <Link href="/admin/dashboard" className="text-2xl font-bold text-[var(--text)] hover:text-[var(--color-primary)] transition-colors">
          Admin Assalam
        </Link>
      </div>
      <nav className="mt-8">
        <ul className="space-y-1 px-4">
          {filteredNavItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`group flex items-center px-4 py-4 rounded-lg transition-all duration-200 font-medium ${
                  pathname === item.href
                    ? "bg-[var(--color-primary)] text-white shadow-[var(--shadow-sm)]"
                    : "text-[var(--text)] hover:bg-[var(--surface)] hover:shadow-[var(--shadow-sm)] hover:translate-x-1"
                }`}
              >
                <span className={`mr-4 transition-transform ${
                  pathname === item.href ? "text-white" : "text-[var(--color-primary)] group-hover:scale-110"
                }`}>
                  {item.icon}
                </span>
                <span className="text-base">{item.name}</span>
              </Link>
            </li>
          ))}
          <li className="pt-12 border-t border-[var(--border)] mt-8">
            <Link
              href="/"
              className="group flex items-center px-4 py-4 text-[var(--color-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--surface)] rounded-lg transition-all duration-200 font-medium hover:shadow-[var(--shadow-sm)] hover:translate-x-1"
            >
              <Home className={`h-5 w-5 mr-4 transition-transform group-hover:scale-110`} />
              <span className="text-base">Retour à l'accueil</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
