"use server";

import { revalidatePath } from "next/cache";
import getDb from "./db";
import { hashPassword, comparePasswords, createSession } from "./auth";
import { cookies } from "next/headers";

// Message functions
export async function saveMessage(formData) {
  try {
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const message = formData.get("message");
    const type = formData.get("type") || "contact";

    if (!firstName || !lastName || !email || !message) {
      return {
        success: false,
        message: "Veuillez remplir tous les champs obligatoires.",
      };
    }

    const db = await getDb();
    db.prepare(
      "INSERT INTO messages (firstName, lastName, email, phone, message, type) VALUES (?, ?, ?, ?, ?, ?)",
    ).run(firstName, lastName, email, phone, message, type);

    revalidatePath("/admin/messages");

    return {
      success: true,
      message: "Message envoyé avec succès.",
    };
  } catch {
    return {
      success: false,
      message:
        "Une erreur s'est produite lors de l'envoi du message. Veuillez réessayer.",
    };
  }
}

export async function getMessages() {
  try {
    const db = await getDb();
    const messages = db
      .prepare("SELECT * FROM messages ORDER BY createdAt DESC")
      .all();
    return { success: true, data: messages };
  } catch {
    return {
      success: false,
      message: "Erreur lors de la récupération des messages",
    };
  }
}

// Blog functions
export async function saveNewBlog(formData) {
  try {
    const title = formData.get("title");
    const excerpt = formData.get("excerpt");
    const content = formData.get("content");
    const category = formData.get("category");
    const status = formData.get("status");
    const shareOnSocial = formData.get("shareOnSocial") === "true";
    const image = formData.get("imagePath"); // Get the image path from the form data

    if (!title || !excerpt || !content || !category || !status) {
      return {
        success: false,
        message: "Veuillez remplir tous les champs obligatoires.",
      };
    }

    const slug = title
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-")
      .trim();

    const db = await getDb();
    db.prepare(
      "INSERT INTO blog_posts (title, slug, excerpt, content, category, status, shareOnSocial, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    ).run(
      title,
      slug,
      excerpt,
      content,
      category,
      status,
      shareOnSocial,
      image,
    );

    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);

    return {
      success: true,
      message: "Article créé avec succès.",
      slug,
    };
  } catch {
    return {
      success: false,
      message:
        "Une erreur s'est produite lors de la création de l'article. Veuillez réessayer.",
    };
  }
}

export async function getBlogs() {
  try {
    const db = await getDb();
    const blogs = db
      .prepare("SELECT * FROM blog_posts ORDER BY createdAt DESC")
      .all();
    return { success: true, data: blogs };
  } catch {
    return {
      success: false,
      message: "Erreur lors de la récupération des articles",
    };
  }
}

export async function getBlogById(id) {
  try {
    const db = await getDb();
    const blog = db.prepare("SELECT * FROM blog_posts WHERE id = ?").get(id);

    if (!blog) {
      return { success: false, message: "Article introuvable." };
    }

    return { success: true, data: blog };
  } catch {
    return {
      success: false,
      message: "Erreur lors de la récupération de l'article.",
    };
  }
}

export async function getBlogBySlug(slug) {
  try {
    const db = await getDb();
    const blog = db.prepare("SELECT * FROM blog_posts WHERE slug = ?").get(slug);

    if (!blog) {
      return { success: false, message: "Article introuvable." };
    }

    return { success: true, data: blog };
  } catch {
    return {
      success: false,
      message: "Erreur lors de la récupération de l'article.",
    };
  }
}


export async function incrementBlogViews(slug) {
  try {
    if (!slug) {
      return { success: false, message: "Slug du blog requis." };
    }

    const db = await getDb();

    // Check if blog exists
    const blog = db.prepare("SELECT id, views FROM blog_posts WHERE slug = ?").get(slug);
    if (!blog) {
      return { success: false, message: "Article non trouvé." };
    }

    // Increment views count
    const newViews = (blog.views || 0) + 1;
    db.prepare("UPDATE blog_posts SET views = ? WHERE slug = ?").run(newViews, slug);

    return { success: true, views: newViews };
  } catch (error) {
    console.error('Error incrementing blog views:', error);
    return {
      success: false,
      message: "Erreur lors de l'incrémentation des vues.",
    };
  }
}

export async function deleteBlog(id) {
  try {
    const db = await getDb();

    // Check if blog exists
    const blog = db.prepare("SELECT * FROM blog_posts WHERE id = ?").get(id);
    if (!blog) {
      return { success: false, message: "Article non trouvé." };
    }

    // Delete the blog
    db.prepare("DELETE FROM blog_posts WHERE id = ?").run(id);

    revalidatePath("/blog");
    revalidatePath("/admin/blogs");

    return { success: true, message: "Article supprimé avec succès." };
  } catch {
    return {
      success: false,
      message: "Une erreur s'est produite lors de la suppression de l'article.",
    };
  }
}

export async function updateBlog(id, formData) {
  try {
    const title = formData.get("title");
    const excerpt = formData.get("excerpt");
    const content = formData.get("content");
    const category = formData.get("category");
    const status = formData.get("status");
    const shareOnSocial = formData.get("shareOnSocial") === "true";

    if (!title || !excerpt || !content || !category || !status) {
      return {
        success: false,
        message: "Veuillez remplir tous les champs obligatoires.",
      };
    }

    const slug = title
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-")
      .trim();

    const db = await getDb();

    // Check if new slug conflicts with existing ones (except current blog)
    const existing = await db.get(
      "SELECT id FROM blog_posts WHERE slug = ? AND id != ?",
      [slug, id],
    );
    if (existing) {
      return {
        success: false,
        message: "Un article avec ce titre existe déjà.",
      };
    }

    await db.prepare(
      `UPDATE blog_posts 
       SET title = ?, slug = ?, excerpt = ?, content = ?, 
           category = ?, status = ?, shareOnSocial = ?
       WHERE id = ?`
    ).run([title, slug, excerpt, content, category, status, shareOnSocial, id]);

    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);

    return {
      success: true,
      message: "Article mis à jour avec succès.",
      slug,
    };
  } catch {
    return {
      success: false,
      message: "Une erreur s'est produite lors de la mise à jour de l'article.",
    };
  }
}

// Admin functions
export async function login(formData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      return {
        success: false,
        message: "Veuillez fournir un email et un mot de passe.",
      };
    }

    const db = await getDb();
    const admin = db.prepare("SELECT * FROM admins WHERE email = ?").get(email);

    if (!admin) {
      return { success: false, message: "Identifiants incorrects." };
    }

    // Check if account is locked
    if (admin.lockedUntil && new Date(admin.lockedUntil) > new Date()) {
      return {
        success: false,
        message:
          "Compte temporairement verrouillé. Veuillez réessayer plus tard.",
      };
    }

    // Verify password
    const isValidPassword = await comparePasswords(password, admin.password);

    if (!isValidPassword) {
      // Increment failed attempts
      const failedAttempts = (admin.failedAttempts || 0) + 1;
      let lockedUntil = null;

      // Lock account after 5 failed attempts
      if (failedAttempts >= 5) {
        lockedUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
      }

      db.prepare(
        "UPDATE admins SET failedAttempts = ?, lockedUntil = ? WHERE id = ?",
      ).run(failedAttempts, lockedUntil, admin.id);

      return { success: false, message: "Identifiants incorrects." };
    }

    // Reset failed attempts and update last login
    db.prepare(
      "UPDATE admins SET failedAttempts = 0, lockedUntil = NULL, lastLogin = CURRENT_TIMESTAMP WHERE id = ?",
    ).run(admin.id);

    // Create session after successful login
    const sessionResult = await createSession({
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    });

    if (!sessionResult.success) {
      return { success: false, message: "Erreur de session" };
    }

    return {
      success: true,
      user: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    };
  } catch {
    return {
      success: false,
      message: "Une erreur s'est produite. Veuillez réessayer.",
    };
  }
}

export async function createAdmin(formData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name");
    const role = formData.get("role");

    if (!email || !password || !name || !role) {
      return { success: false, message: "Tous les champs sont obligatoires" };
    }

    // Password strength validation
    if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[0-9]/.test(password) ||
      !/[^A-Za-z0-9]/.test(password)
    ) {
      return {
        success: false,
        message:
          "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.",
      };
    }

    const hashedPassword = await hashPassword(password);
    const db = await getDb();

    db.prepare(
      "INSERT INTO admins (email, password, name, role, lastPasswordChange) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)",
    ).run(email, hashedPassword, name, role);

    return { success: true, message: "Administrateur créé avec succès" };
  } catch {
    return {
      success: false,
      message: "Erreur lors de la création de l'administrateur",
    };
  }
}

export async function updateAdmin(id, formData) {
  try {
    const email = formData.get("email");
    const name = formData.get("name");
    const role = formData.get("role");
    const password = formData.get("password"); // Optional - only if changing password

    if (!email || !name || !role) {
      return {
        success: false,
        message: "Email, nom et rôle sont obligatoires",
      };
    }

    const db = await getDb();

    // Check if email exists for other admins
    const existing = db
      .prepare("SELECT id FROM admins WHERE email = ? AND id != ?")
      .get(email, id);
    if (existing) {
      return {
        success: false,
        message: "Cet email est déjà utilisé par un autre administrateur.",
      };
    }

    if (password) {
      // Validate password if provided
      if (
        password.length < 8 ||
        !/[A-Z]/.test(password) ||
        !/[a-z]/.test(password) ||
        !/[0-9]/.test(password) ||
        !/[^A-Za-z0-9]/.test(password)
      ) {
        return {
          success: false,
          message:
            "Le nouveau mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.",
        };
      }

      const hashedPassword = await hashPassword(password);
      db.prepare(
        `UPDATE admins 

         SET email = ?, name = ?, role = ?, password = ?, lastPasswordChange = CURRENT_TIMESTAMP

         WHERE id = ?`,
      ).run(email, name, role, hashedPassword, id);
    } else {
      db.prepare(
        "UPDATE admins SET email = ?, name = ?, role = ? WHERE id = ?",
      ).run(email, name, role, id);
    }

    revalidatePath("/admin/admins");

    return {
      success: true,
      message: "Administrateur mis à jour avec succès",
    };
  } catch {
    return {
      success: false,
      message: "Erreur lors de la mise à jour de l'administrateur",
    };
  }
}

export async function deleteAdmin(id) {
  try {
    const db = await getDb();
    db.prepare("DELETE FROM admins WHERE id = ?").run(id);
    return { success: true };
  } catch {
    return {
      success: false,
      message: "Erreur lors de la suppression de l'administrateur",
    };
  }
}

export async function getAdmins() {
  try {
    const db = await getDb();
    const admins = db
      .prepare("SELECT id, email, name, role, createdAt, lastLogin FROM admins")
      .all();
    return { success: true, data: admins };
  } catch {
    return {
      success: false,
      message: "Erreur lors de la récupération des administrateurs",
    };
  }
}

// Stats function
export async function getStats() {
  try {
    const db = await getDb();

    // Get total blogs and new blogs (last 30 days)
    const totalBlogs = db
      .prepare("SELECT COUNT(*) as count FROM blog_posts")
      .get();

    const newBlogs = db
      .prepare(
        "SELECT COUNT(*) as count FROM blog_posts WHERE createdAt >= datetime('now', '-30 days')",
      )
      .get();

    // Get total messages and new messages
    const totalMessages = db
      .prepare("SELECT COUNT(*) as count FROM messages")
      .get();

    const newMessages = db
      .prepare(
        "SELECT COUNT(*) as count FROM messages WHERE createdAt >= datetime('now', '-30 days')",
      )
      .get();

    // Get total views and views change
    const totalViews = db
      .prepare("SELECT SUM(views) as count FROM blog_posts")
      .get();

    const previousViews = db
      .prepare(
        "SELECT SUM(views) as count FROM blog_posts WHERE createdAt < datetime('now', '-30 days')",
      )
      .get();

    const currentViews = db
      .prepare(
        "SELECT SUM(views) as count FROM blog_posts WHERE createdAt >= datetime('now', '-30 days')",
      )
      .get();

    // Get total projects and new projects (last 30 days)
    const totalProjects = db
      .prepare("SELECT COUNT(*) as count FROM projects")
      .get();

    const newProjects = db
      .prepare(
        "SELECT COUNT(*) as count FROM projects WHERE createdAt >= datetime('now', '-30 days')",
      )
      .get();

    // Get total beneficiaries from projects
    const totalBeneficiaries = db
      .prepare("SELECT SUM(CAST(peopleHelped AS INTEGER)) as count FROM projects WHERE peopleHelped != '' AND peopleHelped IS NOT NULL")
      .get();

    // Get recent blogs
    const recentBlogs = db
      .prepare(
        `SELECT id, title, views, createdAt as date
      FROM blog_posts
      ORDER BY createdAt DESC LIMIT 3`,
      )
      .all();

    // Get recent messages
    const recentMessages = db
      .prepare(
        `SELECT
        id,
        firstName || ' ' || lastName as name,
        substr(message, 1, 50) || '...' as excerpt,
        type,
        createdAt as date
      FROM messages
      ORDER BY createdAt DESC LIMIT 3`,
      )
      .all();

    // Get recent projects
    const recentProjects = db
      .prepare(
        `SELECT id, title, peopleHelped, createdAt as date
      FROM projects
      ORDER BY createdAt DESC LIMIT 3`,
      )
      .all();

    // Calculate percentages
    const newBlogsPercent =
      Math.round((newBlogs.count / totalBlogs.count) * 100) || 0;
    const newMessagesPercent =
      Math.round((newMessages.count / totalMessages.count) * 100) || 0;
    const newProjectsPercent =
      Math.round((newProjects.count / totalProjects.count) * 100) || 0;
    const viewsChangePercent = previousViews.count
      ? Math.round(
          ((currentViews.count - previousViews.count) / previousViews.count) *
            100,
        )
      : 0;

    // Get total administrators
    const totalAdmins = db
      .prepare("SELECT COUNT(*) as count FROM admins")
      .get();

    return {
      success: true,
      totalBlogs: totalBlogs.count,
      newBlogsPercent,
      totalMessages: totalMessages.count,
      newMessagesPercent,
      totalProjects: totalProjects.count,
      newProjectsPercent,
      totalViews: totalViews.count || 0,
      totalBeneficiaries: totalBeneficiaries.count || 0,
      totalAdmins: totalAdmins.count,
      projectsCount: totalProjects.count, // For backward compatibility
      adminsCount: totalAdmins.count, // For backward compatibility
      viewsChangePercent,
      recentBlogs,
      recentMessages,
      recentProjects,
    };
  } catch (error) {
    console.error('Error getting stats:', error);
    return {
      success: false,
      message: "Erreur lors de la récupération des statistiques",
    };
  }
}

// Message management functions
export async function markMessageAsRead(id) {
  try {
    const db = await getDb();
    db.prepare("UPDATE messages SET status = ? WHERE id = ?").run(["read", id]);
    revalidatePath("/admin/messages");
    return { success: true };
  } catch {
    return { success: false };
  }
}

export async function deleteMessage(id) {
  try {

    // Extract ID if an object is passed
    const messageId = typeof id === 'object' && id.id ? id.id : id;

    if (!messageId) {
      return { success: false, message: "ID du message manquant" };
    }

    const db = await getDb();
    db.prepare("DELETE FROM messages WHERE id = ?").run([messageId]);
    revalidatePath("/admin/messages");
    return { success: true };
  } catch  {
    return { success: false, message: "Erreur lors de la suppression du message" };
  }
}

export async function clearSession() {
  try {
    const cookieStore = await cookies(); // No need to await, cookies() is synchronous
    cookieStore.delete("admin-session"); // Use the correct cookie name
    return { success: true };
  } catch {
    return { success: false, message: "Erreur lors de la déconnexion." };
  }
}



// Project functions
export async function saveNewProject(projectData) {
  try {
    const { title, excerpt, image, categories, startDate, location, peopleHelped, status, content, goals, gallery } = projectData;

    if (!title || !excerpt || !categories || categories.length === 0) {
      return {
        success: false,
        message: "Veuillez remplir tous les champs obligatoires.",
      };
    }

    const slug = title
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-")
      .trim();

    const db = await getDb();

    // Check if slug already exists
    const existingProject = db.prepare("SELECT id FROM projects WHERE slug = ?").get(slug);
    if (existingProject) {
      return {
        success: false,
        message: "Un projet avec ce titre existe déjà.",
      };
    }

    // Generate project ID
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);

    const newProject = {
      id,
      slug,
      title,
      excerpt,
      image,
      categories: JSON.stringify(categories),
      startDate,
      location,
      peopleHelped,
      status,
      content: JSON.stringify(content || []),
      goals: JSON.stringify(goals || []),
      gallery: JSON.stringify(gallery || []),
      createdAt: new Date().toISOString(),
    };

    db.prepare(`
      INSERT INTO projects (id, slug, title, excerpt, image, categories, startDate, location, peopleHelped, status, content, goals, gallery, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      newProject.id,
      newProject.slug,
      newProject.title,
      newProject.excerpt,
      newProject.image,
      newProject.categories,
      newProject.startDate,
      newProject.location,
      newProject.peopleHelped,
      newProject.status,
      newProject.content,
      newProject.goals,
      newProject.gallery,
      newProject.createdAt
    );

    // Project created successfully - no need to generate static page
    return {
      success: true,
      message: "Projet créé avec succès.",
      slug,
    };
  } catch (error) {
    console.error('Error creating project:', error);
    return {
      success: false,
      message: "Une erreur s'est produite lors de la création du projet. Veuillez réessayer.",
    };
  }
}

export async function getProjects() {
  try {
    const db = await getDb();
    const projects = db
      .prepare(`
        SELECT id, slug, title, excerpt, image, categories, startDate, location, peopleHelped, status, content, goals, gallery, createdAt, updatedAt
        FROM projects
        ORDER BY createdAt DESC
      `)
      .all();

    // Parse JSON fields for each project
    const parsedProjects = projects.map(project => ({
      ...project,
      categories: JSON.parse(project.categories || '[]'),
      content: JSON.parse(project.content || '[]'),
      goals: project.goals ? JSON.parse(project.goals) : [],
      gallery: project.gallery ? JSON.parse(project.gallery) : []
    }));

    return { success: true, data: parsedProjects };
  } catch (error) {
    console.error('Error loading projects:', error);
    return {
      success: false,
      message: "Erreur lors de la récupération des projets",
    };
  }
}

export async function updateProject(id, projectData) {
  try {
    const { title, excerpt, image, categories, startDate, location, peopleHelped, status, content, goals, gallery } = projectData;

    if (!title || !excerpt || !categories || categories.length === 0) {
      return {
        success: false,
        message: "Veuillez remplir tous les champs obligatoires.",
      };
    }

    const slug = title
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-")
      .trim();

    const db = await getDb();

    // Check if another project with same slug exists (excluding current project)
    const existingProject = db.prepare("SELECT id FROM projects WHERE slug = ? AND id != ?").get(slug, id);
    if (existingProject) {
      return {
        success: false,
        message: "Un projet avec ce titre existe déjà.",
      };
    }

    // Check if project exists
    const projectExists = db.prepare("SELECT id FROM projects WHERE id = ?").get(id);
    if (!projectExists) {
      return {
        success: false,
        message: "Projet non trouvé.",
      };
    }

    const updatedProject = {
      id,
      slug,
      title,
      excerpt,
      image,
      categories: JSON.stringify(categories),
      startDate,
      location,
      peopleHelped,
      status,
      content: JSON.stringify(content || []),
      goals: JSON.stringify(goals || []),
      gallery: JSON.stringify(gallery || []),
      updatedAt: new Date().toISOString(),
    };

    db.prepare(`
      UPDATE projects
      SET slug = ?, title = ?, excerpt = ?, image = ?, categories = ?, startDate = ?, location = ?, peopleHelped = ?, status = ?, content = ?, goals = ?, gallery = ?, updatedAt = ?
      WHERE id = ?
    `).run(
      updatedProject.slug,
      updatedProject.title,
      updatedProject.excerpt,
      updatedProject.image,
      updatedProject.categories,
      updatedProject.startDate,
      updatedProject.location,
      updatedProject.peopleHelped,
      updatedProject.status,
      updatedProject.content,
      updatedProject.goals,
      updatedProject.gallery,
      updatedProject.updatedAt,
      id
    );

    // Project updated successfully - no need to regenerate static page
    return {
      success: true,
      message: "Projet mis à jour avec succès.",
      slug,
    };
  } catch (error) {
    console.error('Error updating project:', error);
    return {
      success: false,
      message: "Une erreur s'est produite lors de la mise à jour du projet. Veuillez réessayer.",
    };
  }
}

export async function deleteProject(id) {
  try {
    const db = await getDb();

    // Check if project exists
    const project = db.prepare("SELECT * FROM projects WHERE id = ?").get(id);
    if (!project) {
      return { success: false, message: "Projet non trouvé." };
    }

    // Delete the project
    db.prepare("DELETE FROM projects WHERE id = ?").run(id);

    return { success: true, message: "Projet supprimé avec succès." };
  } catch (error) {
    console.error('Error deleting project:', error);
    return {
      success: false,
      message: "Une erreur s'est produite lors de la suppression du projet.",
    };
  }
}
