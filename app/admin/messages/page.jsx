"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getMessages, deleteMessage, markMessageAsRead } from "lib/actions";
import { Mail, Star, Trash2, Inbox, CheckCircle, Eye } from "lucide-react";
import {
  AdminPageHeader,
  AdminTable,
  AdminActionButtons,
  AdminStatsCard,
  Button,
} from "components/unified";

export default function MessagesAdmin() {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    unread: 0,
    read: 0,
  });

  useEffect(() => {
    async function fetchMessages() {
      const result = await getMessages();
      if (result.success) {
        setMessages(result.data);

        // Calculate stats
        const total = result.data.length;
        const unread = result.data.filter((m) => m.status === "unread").length;
        const read = total - unread;
        setStats({ total, unread, read });
      }
    }
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    console.log("handleDelete called with id:", id);
    const result = await deleteMessage(id);
    console.log("deleteMessage result:", result);
    if (result.success) {
      console.log("Delete successful, updating UI");
      // Update local state immediately
      setMessages(messages.filter((m) => m.id !== id));
      setStats((prev) => ({
        ...prev,
        total: prev.total - 1,
        unread:
          messages.find((m) => m.id === id)?.status === "unread"
            ? prev.unread - 1
            : prev.unread,
      }));

      // Refresh the page to ensure fresh data
      router.refresh();
    } else {
      console.error("Delete failed:", result.message);
    }
  };

  const handleMarkAsRead = async (id) => {
    const result = await markMessageAsRead(id);
    if (result.success) {
      setMessages(
        messages.map((m) => (m.id === id ? { ...m, status: "read" } : m)),
      );
      setStats((prev) => ({
        ...prev,
        unread: prev.unread - 1,
        read: prev.read + 1,
      }));
    }
  };

  const columns = [
    {
      key: "name",
      label: "Expéditeur",
      render: (value, item) => (
        <div>
          <p className="font-medium">{value}</p>
          <p className="text-sm text-gray-500">{item.email}</p>
        </div>
      ),
    },
    {
      key: "phone",
      label: "Téléphone",
      render: (value) => value || "N/A"
    },
    {
      key: "type",
      label: "Type",
      render: (value) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            value === "donation"
              ? "bg-green-100 text-green-800"
              : value === "volunteer"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-800"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "message",
      label: "Message",
      render: (value) => (
        <p className="text-sm text-gray-600 truncate max-w-xs">
          {value}
        </p>
      ),
    },
    {
      key: "createdAt",
      label: "Date",
      render: (value) => new Date(value).toLocaleDateString('fr-FR')
    },
  ];

  const actionButtons = [
    {
      key: "markAsRead",
      icon: Star,
      onClick: handleMarkAsRead,
      className: "text-yellow-600 hover:text-yellow-900",
      title: "Marquer comme lu"
    },
    {
      key: "view",
      icon: Eye,
      href: (item) => `/admin/messages/${item.id}`,
      className: "text-blue-600 hover:text-blue-900",
      title: "Voir détails"
    },
    {
      key: "delete",
      icon: Trash2,
      onClick: handleDelete,
      className: "text-red-600 hover:text-red-900",
      title: "Supprimer"
    },
  ];

  return (
    <div className="p-4 md:p-8">
      <AdminPageHeader title="Messages" />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <AdminStatsCard
          title="Total"
          value={stats.total}
          type="total"
        />
        <AdminStatsCard
          title="Non lus"
          value={stats.unread}
          type="unread"
        />
        <AdminStatsCard
          title="Lus"
          value={stats.read}
          type="read"
        />
      </div>

      <AdminTable
        columns={columns}
        data={messages}
        renderActions={(item) => (
          <AdminActionButtons item={item} actions={actionButtons} />
        )}
      />
    </div>
  );
}
