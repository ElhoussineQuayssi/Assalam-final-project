import { useState, useEffect, useCallback } from "react";
import { getSession } from "../lib/auth";

// Hook for authentication state management
export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkAuth = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const session = await getSession();
      setUser(session);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      const response = await fetch("/api/session", { method: "POST" });
      if (response.ok) {
        setUser(null);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Logout error:", error);
      return false;
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    logout,
    refreshAuth: checkAuth,
  };
}

// Hook for managing project data with caching
export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/projects");
      if (!response.ok) throw new Error("Failed to fetch projects");

      const data = await response.json();
      setProjects(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createProject = useCallback(
    async (projectData) => {
      try {
        const response = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(projectData),
        });

        if (response.ok) {
          await fetchProjects(); // Refresh the list
          return { success: true };
        }
        return { success: false, error: "Failed to create project" };
      } catch (error) {
        return { success: false, error: "Network error" };
      }
    },
    [fetchProjects],
  );

  const updateProject = useCallback(
    async (id, projectData) => {
      try {
        const response = await fetch(`/api/projects/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(projectData),
        });

        if (response.ok) {
          await fetchProjects(); // Refresh the list
          return { success: true };
        }
        return { success: false, error: "Failed to update project" };
      } catch (error) {
        return { success: false, error: "Network error" };
      }
    },
    [fetchProjects],
  );

  const deleteProject = useCallback(
    async (id) => {
      try {
        const response = await fetch(`/api/projects/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          await fetchProjects(); // Refresh the list
          return { success: true };
        }
        return { success: false, error: "Failed to delete project" };
      } catch (error) {
        return { success: false, error: "Network error" };
      }
    },
    [fetchProjects],
  );

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    loading,
    error,
    createProject,
    updateProject,
    deleteProject,
    refetch: fetchProjects,
  };
}

// Hook for managing blog data
export function useBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBlogs = useCallback(async (category) => {
    setLoading(true);
    setError(null);

    try {
      const params = category ? `?category=${category}` : "";
      const response = await fetch(`/api/blogs${params}`);
      if (!response.ok) throw new Error("Failed to fetch blogs");

      const data = await response.json();
      setBlogs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    blogs,
    loading,
    error,
    fetchBlogs,
  };
}

// Hook for managing messages/inbox
export function useMessages() {
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMessages = useCallback(async (type) => {
    setLoading(true);
    setError(null);

    try {
      const params = type ? `?type=${type}` : "";
      const response = await fetch(`/api/messages${params}`);
      if (!response.ok) throw new Error("Failed to fetch messages");

      const data = await response.json();
      setMessages(data.messages);
      setUnreadCount(data.unreadCount || 0);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const markAsRead = useCallback(async (id) => {
    try {
      const response = await fetch(`/api/messages/${id}/read`, {
        method: "POST",
      });

      if (response.ok) {
        setMessages((prev) =>
          prev.map((msg) => (msg.id === id ? { ...msg, read: true } : msg)),
        );
        setUnreadCount((prev) => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error("Error marking message as read:", error);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return {
    messages,
    unreadCount,
    loading,
    error,
    fetchMessages,
    markAsRead,
  };
}
