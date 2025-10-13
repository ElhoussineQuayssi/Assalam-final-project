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
    <aside className="w-64 bg-white shadow-md h-screen">
      <div className="p-6 border-b border-gray-200">
        <Link href="/admin/dashboard" className="text-xl font-bold text-gray-800">
          Admin Assalam
        </Link>
      </div>
      <nav className="mt-6">
        <ul className="space-y-2 px-2">
          {filteredNavItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                  pathname === item.href
                    ? "bg-blue-700 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
          <li className="pt-8">
            <Link
              href="/"
              className="flex items-center px-4 py-3 text-blue-600 hover:text-blue-800 rounded-lg transition-colors"
            >
              <Home className="h-5 w-5 mr-3" />
              <span>Retour à l'accueil</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
