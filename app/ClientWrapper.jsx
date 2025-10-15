"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// --- Design System Configuration (Minimalist Light Blue) ---
const BACKGROUND = '#FAFAFA';    // Off-White (used for UI background)

export default function ClientWrapper({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {/* FIX: Set language to French for semantic correctness */}
      {/* FIX: Replaced 'bg-background' Tailwind class with inline style using the BACKGROUND constant */}
      <div style={{ backgroundColor: BACKGROUND }}>
        {/* Design system reference: Header pattern from foundation-blueprint.html - sticky navbar for non-admin pages */}
        {!isAdmin && <Navbar />}
        {children}
        {!isAdmin && <Footer />}
        <script src="/js-scroll-reveal.js"></script>
      </div>
    </>
  );
}