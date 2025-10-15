import { redirect } from "next/navigation";
import { getSession } from "lib/auth";
// import AdminSidebar from "components/AdminSidebar"; // Component integrated below

// --- Design System Configuration (Minimalist Light Blue) ---
const ACCENT = '#6495ED';        // Cornflower Blue
const DARK_TEXT = '#333333';     // Dark Gray
const BACKGROUND = '#FAFAFA';    // Off-White

// --- Integrated AdminSidebar Component ---
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Newspaper,
  MessageSquare,
  Users,
  LayoutDashboard,
  FolderOpen,
  Home,
  LogOut, // Added LogOut for completeness
  ChevronRight, // Added ChevronRight for active indicator
} from 'lucide-react';
import AdminSidebar from "@/components/AdminSidebar/AdminSidebar";



export default async function AdminProjectsLayout({ children }) {
  const session = await getSession();

  if (!session) {
    console.log("No session found, redirecting to login");
    redirect("/admin/login");
  }

  return (
    <div
      className="flex min-h-screen"
      style={{ backgroundColor: BACKGROUND }} // Apply BACKGROUND color from DS
    >
      {/* Sidebar */}
      {/* The component is now available in this file */}
      <AdminSidebar user={session} />

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
