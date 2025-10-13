import { redirect } from "next/navigation";
import { getSession } from "lib/auth";
import AdminSidebar from "components/AdminSidebar";

export default async function AdminDashboardLayout({ children }) {
  const session = await getSession();

  if (!session) {
    console.log("No session found, redirecting to login");
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-[var(--bg)]">
      {/* Sidebar */}
      <AdminSidebar user={session} />

      {/* Main Content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
