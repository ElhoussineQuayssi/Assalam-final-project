import { supabaseAdmin } from "./supabaseAdmin";

/**
 * Fetches all image URLs from the project_images table
 * @returns {Promise<string[]>} A flat array of all image URLs
 * @throws {Error} If there's an error fetching the images
 */
export async function getAllGalleryImages() {
  try {
    const { data, error } = await supabaseAdmin
      .from("project_images")
      .select("image_url");

    if (error) {
      console.error("Error fetching all gallery images:", error);
      // Return empty array instead of throwing to prevent crashes
      return [];
    }

    // Map the array of objects to a flat array of URLs
    return data ? data.map(row => row.image_url) : [];
  } catch (error) {
    console.error("Unexpected error in getAllGalleryImages:", error);
    // Return empty array instead of throwing to prevent crashes
    return [];
  }
}

/**
 * Fetches all image URLs associated with a specific project
 * @param {string} projectId - The ID of the project to fetch images for
 * @returns {Promise<string[]>} An array of image URLs for the specified project
 * @throws {Error} If there's an error fetching the images or if projectId is invalid
 */
export async function getProjectGalleryImages(projectId) {
  try {
    // Input validation
    if (!projectId) {
      throw new Error("Project ID is required");
    }

    const { data, error } = await supabaseAdmin
      .from("project_images")
      .select("image_url")
      .eq("id_project", projectId);

    if (error) {
      console.error("Error fetching project gallery images:", error);
      throw new Error(`Failed to fetch gallery images for project ${projectId}`);
    }

    // Map the array of objects to a flat array of URLs
    return data.map(row => row.image_url);
  } catch (error) {
    console.error("Unexpected error in getProjectGalleryImages:", error, { projectId });
    throw error;
  }
}