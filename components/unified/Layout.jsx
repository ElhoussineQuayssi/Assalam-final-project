"use client";

import Navbar from "../Navbar";
import Footer from "../Footer";
import { usePathname } from "next/navigation";

export default function Layout({ children, metadata = {} }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Navbar />}
      <main className="min-h-screen">{children}</main>
      {!isAdmin && <Footer />}
    </>
  );
}
