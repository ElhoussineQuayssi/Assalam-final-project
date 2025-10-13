"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="relative w-12 h-12 mr-2">
            <Image
              src="/logo.png"
              alt="Logo Fondation Assalam"
              fill
              className="object-contain"
            />
          </div>
          <span
            className={`font-bold text-xl ${scrolled ? "text-brand-primary" : "text-white"}`}
          >
            Fondation Assalam
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {[ { name: "Accueil", href: "/" },
            { name: "À Propos", href: "/about" },
            { name: "Projets", href: "/projects" },
            { name: "Blog", href: "/blogs" },
            { name: "Contact", href: "/contact" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === item.href
                  ? scrolled
                    ? "text-brand-primary"
                    : "text-white bg-white/20"
                  : scrolled
                    ? "text-gray-700 hover:text-brand-primary"
                    : "text-white/90 hover:text-white hover:bg-white/10"
              } transition-colors`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X
              className={`h-6 w-6 ${scrolled ? "text-gray-900" : "text-white"}`}
            />
          ) : (
            <Menu
              className={`h-6 w-6 ${scrolled ? "text-gray-900" : "text-white"}`}
            />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            {[
              { name: "Accueil", href: "/" },
              { name: "À Propos", href: "/about" },
              { name: "Projets", href: "/projects" },
              { name: "Blog", href: "/blogs" },
              { name: "Contact", href: "/contact" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === item.href
                    ? "text-brand-primary bg-blue-50"
                    : "text-gray-700 hover:text-brand-primary hover:bg-gray-50"
                }`}
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
