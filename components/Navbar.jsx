"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

/**
 * Navbar Component (Header)
 *
 * Implements the Design System's Header pattern:
 * - Sticky `bg-white` with `shadow-lg` for elevation.
 * - Uses the Max-Width Container system.
 * - Colors: Accent (#6495ED), Dark Text (#333333).
 * - Typography: Logo is `text-2xl font-bold`.
 * - Interaction: Links use smooth `hover:text-accent` transition.
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Color System Constants (for explicit Tailwind usage)
  const ACCENT_BLUE = "#6495ED"; // --color-accent
  const DARK_TEXT = "#333333"; // --color-text
  const PRIMARY_LIGHT = "#B0E0E6"; // --color-primary (used for light background)

  useEffect(() => {
    const handleScroll = () => {
      // Enhanced scroll logic with smooth transitions
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navItems = [
    { name: "Accueil", href: "/" },
    { name: "À Propos", href: "/about" },
    { name: "Projets", href: "/projects" },
    { name: "Blog", href: "/blogs" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    // Component Pattern Library: Header (Sticky, Enhanced Shadow, bg-white)
    <header
      className={`sticky top-0 z-50 transition-all duration-300 bg-white shadow-lg`}
    >
      {/* Layout Architecture: Max-Width Container System */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
        {/* Logo - Typography System: text-2xl font-bold, Accent Color */}
        <Link href="/" className="flex items-center group">
          <div className="relative w-10 h-10 mr-2">
            <Image
              src="/logo.png"
              alt="Logo Fondation Assalam"
              fill
              className="object-contain"
            />
          </div>
          <span
            className={`font-bold text-2xl text-[${ACCENT_BLUE}] group-hover:text-opacity-80 transition duration-200`}
          >
            Fondation Assalam
          </span>
        </Link>

        {/* Desktop Navigation - Enhanced Typography & Color Application */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap
                text-[${DARK_TEXT}]
                hover:text-[${ACCENT_BLUE}]
                transition duration-200 ease-in-out
                ${
                  pathname === item.href
                    ? `text-[${ACCENT_BLUE}] bg-[${PRIMARY_LIGHT}]/30 font-semibold shadow-sm`
                    : ""
                }
              `}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Interactive Elements: Mobile menu button (Enhanced A11y) */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-50 transition duration-150 focus:outline-none focus:ring-4 focus:ring-[#6495ED] focus:ring-opacity-50"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen} // Enhanced A11y
        >
          {/* Use Dark Text color for icon on white background */}
          {isOpen ? (
            <X className={`h-6 w-6 text-[${DARK_TEXT}]`} />
          ) : (
            <Menu className={`h-6 w-6 text-[${DARK_TEXT}]`} />
          )}
        </button>
      </div>

      {/* Mobile Navigation - Enhanced Design System Styling */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-inner">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  block px-4 py-2 rounded-lg text-base font-medium transition duration-200
                  ${
                    // Active Link: Accent text on Primary-Light background
                    pathname === item.href
                      ? `text-[${ACCENT_BLUE}] bg-[${PRIMARY_LIGHT}]/50 font-semibold`
                      : // Default Link: Dark Text, Hover to Accent
                        `text-[${DARK_TEXT}] hover:text-[${ACCENT_BLUE}] hover:bg-gray-50`
                  }
                `}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
