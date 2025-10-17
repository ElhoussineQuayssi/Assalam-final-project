"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import dynamic from "next/dynamic";
import { getBlogById, updateBlog } from "lib/actions";
import { ShareIcon, AlertTriangle, Loader2 } from "lucide-react";

// Import extracted component
import Alert from "@/components/Alert/Alert.jsx";

// Dynamically import TinyMCE editor with loading spinner
const Editor = dynamic(
  () => import("@tinymce/tinymce-react").then((mod) => mod.Editor),
  {
    loading: () => (
      <div className="flex justify-center items-center h-64 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg">
        <Loader2
          className="h-8 w-8 animate-spin mr-2"
          style={{ color: "#6495ED" }}
        />
        <span className="text-gray-600">Chargement de l'éditeur...</span>
      </div>
    ),
    ssr: false,
  },
);

// --- Design System Configuration (Minimalist Light Blue) ---
const ACCENT = "#6495ED"; // Cornflower Blue
const PRIMARY_LIGHT = "#B0E0E6"; // Powder Blue
const DARK_TEXT = "#333333"; // Dark Gray
const BACKGROUND = "#FAFAFA"; // Off-White

// Calculated transparent background for the social box
const PRIMARY_LIGHT_TRANS = `${PRIMARY_LIGHT}4D`; // PRIMARY_LIGHT with ~30% opacity

export default function EditBlog() {
  const router = useRouter();
  const { id } = useParams();
  const [formState, setFormState] = useState({
    status: "idle", // idle, submitting, success, error
    message: "",
    shareOnSocial: true,
  });
  const [blog, setBlog] = useState(null);
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // --- Original Data Fetching Logic Preserved ---
  useEffect(() => {
    async function fetchBlog() {
      try {
        const result = await getBlogById(id);
        if (result.success) {
          setBlog(result.data);
          setContent(result.data.content || "");
          setFormState((prev) => ({
            ...prev,
            shareOnSocial: result.data.share_on_social || false,
          }));
          setImagePreview(result.data.image || null);
        } else {
          setFormState((prev) => ({
            ...prev,
            status: "error",
            message: "Erreur lors de la récupération de l'article.",
          }));
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        setFormState((prev) => ({
          ...prev,
          status: "error",
          message: "Une erreur s'est produite.",
        }));
      }
    }
    fetchBlog();
  }, [id]);

  // Handle image selection and preview
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormState({
      ...formState,
      status: "submitting",
      message: "Mise à jour en cours...",
    });

    const formData = new FormData(event.target);
    // Ensure content is properly set in formData
    formData.set("content", content);
    formData.set("shareOnSocial", formState.shareOnSocial ? "true" : "false");

    // Handle image upload if a new image was selected
    if (selectedImage) {
      try {
        setFormState((prev) => ({
          ...prev,
          message: "Téléchargement de l'image...",
        }));

        const uploadFormData = new FormData();
        uploadFormData.append("image", selectedImage);

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: uploadFormData,
        });

        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json();
          console.error("Image upload error:", errorData);
          throw new Error(errorData.error || "Image upload failed!");
        }

        const uploadResult = await uploadResponse.json();
        formData.set("image", uploadResult.filePath); // Set the uploaded image path
      } catch (error) {
        console.error("Image upload failed:", error);
        setFormState({
          ...formState,
          status: "error",
          message:
            error.message ||
            "Une erreur s'est produite lors du téléchargement de l'image.",
        });
        return;
      }
    } else if (blog.image) {
      // Keep existing image if no new image was selected
      formData.set("image", blog.image);
    }

    try {
      setFormState((prev) => ({
        ...prev,
        message: "Sauvegarde de l'article...",
      }));

      const result = await updateBlog(id, formData);
      if (result.success) {
        // Redirect on success
        router.push("/admin/blogs");
      } else {
        setFormState({
          ...formState,
          status: "error",
          message:
            result.message || "Une erreur s'est produite. Veuillez réessayer.",
        });
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      setFormState({
        ...formState,
        status: "error",
        message: "Une erreur s'est produite. Veuillez réessayer.",
      });
    }
  };

  if (!blog) {
    // Transformed Loading State: Centered Accent Spinner using inline styles
    return (
      <div
        className="min-h-screen flex justify-center items-center"
        style={{ backgroundColor: BACKGROUND }}
      >
        <Loader2 className="h-8 w-8 animate-spin" style={{ color: ACCENT }} />
        <p className="ml-3 text-lg" style={{ color: DARK_TEXT }}>
          Chargement de l'article...
        </p>
      </div>
    );
  }

  // Helper function to apply color styles to form elements
  const inputStyle = {
    color: DARK_TEXT,
    // Using CSS variables to dynamically set focus ring and border color for Tailwind classes
    "--tw-ring-color": ACCENT,
    "--tw-focus-ring-color": ACCENT,
    "--tw-border-color": ACCENT,
  };

  // --- Transformed JSX (Minimalist Light Blue Design) ---
  return (
    // Set main canvas background color using inline style
    <main
      className="min-h-screen py-10 px-4 md:px-8"
      style={{ backgroundColor: BACKGROUND }}
    >
      <div className="max-w-7xl mx-auto">
        {/* H1 Typography Pattern: Bold, Dark Text */}
        <h1 className="text-3xl font-bold mb-8" style={{ color: DARK_TEXT }}>
          Modifier l'article
        </h1>

        <Alert type={formState.status} message={formState.message} />

        {/* Form as Content Card Pattern with Scroll Reveal */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-8 scroll-reveal"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Left Side (2/3 width) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title Field */}
              <div>
                {/* Label Typography Pattern: Body Text, Dark Text */}
                <label
                  className="block text-lg font-semibold mb-2"
                  htmlFor="title"
                  style={{ color: DARK_TEXT }}
                >
                  Titre *
                </label>
                {/* Input Styling: Accent Focus Ring, generous padding */}
                <input
                  type="text"
                  id="title"
                  name="title"
                  defaultValue={blog.title}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition duration-150 text-lg shadow-sm"
                  style={inputStyle}
                />
              </div>

              {/* Excerpt Field */}
              <div>
                <label
                  className="block text-lg font-semibold mb-2"
                  htmlFor="excerpt"
                  style={{ color: DARK_TEXT }}
                >
                  Extrait *
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  rows="3"
                  defaultValue={blog.excerpt}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition duration-150 text-lg shadow-sm"
                  style={inputStyle}
                ></textarea>
              </div>

              {/* Content Editor */}
              <div>
                <label
                  className="block text-lg font-semibold mb-2"
                  htmlFor="content"
                  style={{ color: DARK_TEXT }}
                >
                  Contenu *
                </label>
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                  value={content}
                  onEditorChange={(newContent) => setContent(newContent)}
                  init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | formatselect | bold italic backcolor | \
                      alignleft aligncenter alignright alignjustify | \
                      bullist numlist outdent indent | removeformat | help",
                  }}
                />
              </div>
            </div>

            {/* Sidebar - Right Side (1/3 width) */}
            <div className="space-y-6">
              {/* Category Field */}
              <div>
                <label
                  className="block text-lg font-semibold mb-2"
                  htmlFor="category"
                  style={{ color: DARK_TEXT }}
                >
                  Catégorie *
                </label>
                <select
                  id="category"
                  name="category"
                  defaultValue={blog.category}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition duration-150 text-lg shadow-sm appearance-none bg-white"
                  style={inputStyle}
                >
                  <option value="">Sélectionner une catégorie</option>
                  <option value="Education">Éducation</option>
                  <option value="Sante">Santé</option>
                  <option value="Environnement">Environnement</option>
                  <option value="Culture">Culture</option>
                  <option value="Solidarite">Solidarité</option>
                </select>
              </div>

              {/* Image Upload Field */}
              <div>
                <label
                  className="block text-lg font-semibold mb-2"
                  htmlFor="image"
                  style={{ color: DARK_TEXT }}
                >
                  Image principale
                </label>
                {/* Current Image Display */}
                {imagePreview && (
                  <div className="mb-4">
                    <img
                      src={imagePreview}
                      alt="Image actuelle"
                      className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                    />
                    <p className="text-sm text-gray-600 mt-1">Image actuelle</p>
                  </div>
                )}
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 hover:file:bg-gray-200 p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition duration-150 shadow-sm"
                  style={{
                    ...inputStyle,
                    "--tw-file-text": DARK_TEXT,
                  }}
                />
                <p className="text-sm text-gray-600 mt-1">
                  Laissez vide pour conserver l'image actuelle
                </p>
              </div>

              {/* Status Radio Buttons */}
              <div>
                <label
                  className="block text-lg font-semibold mb-3"
                  style={{ color: DARK_TEXT }}
                >
                  Status
                </label>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <input
                      id="status-published"
                      name="status"
                      type="radio"
                      value="published"
                      defaultChecked={blog.status === "published"}
                      // Accent focus/checked color
                      className="h-5 w-5 border-gray-300 focus:ring-accent"
                      style={{ color: ACCENT }}
                    />
                    <label
                      htmlFor="status-published"
                      className="ml-3 block text-base"
                      style={{ color: DARK_TEXT }}
                    >
                      Publié
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="status-draft"
                      name="status"
                      type="radio"
                      value="draft"
                      defaultChecked={blog.status === "draft"}
                      // Accent focus/checked color
                      className="h-5 w-5 border-gray-300 focus:ring-accent"
                      style={{ color: ACCENT }}
                    />
                    <label
                      htmlFor="status-draft"
                      className="ml-3 block text-base"
                      style={{ color: DARK_TEXT }}
                    >
                      Brouillon
                    </label>
                  </div>
                </div>
              </div>

              {/* Social Sharing Box - Subtle Background Pattern */}
              <div
                className="p-6 rounded-xl border"
                style={{
                  backgroundColor: PRIMARY_LIGHT_TRANS,
                  borderColor: PRIMARY_LIGHT,
                }}
              >
                <div className="flex items-center mb-4">
                  <input
                    id="share-social"
                    type="checkbox"
                    checked={formState.shareOnSocial}
                    onChange={() =>
                      setFormState({
                        ...formState,
                        shareOnSocial: !formState.shareOnSocial,
                      })
                    }
                    // Accent checked color
                    className="h-5 w-5 border-gray-300 rounded focus:ring-accent"
                    style={{ color: ACCENT }}
                  />
                  <label
                    htmlFor="share-social"
                    className="ml-3 block text-base font-semibold"
                    style={{ color: DARK_TEXT }}
                  >
                    Partager sur les réseaux sociaux
                  </label>
                </div>

                <div className="text-sm text-gray-700 flex items-start mt-2">
                  <ShareIcon
                    className="h-5 w-5 mr-3 flex-shrink-0"
                    style={{ color: ACCENT }}
                  />
                  <p>
                    L'article sera automatiquement partagé sur vos comptes
                    sociaux liés lors de la publication.
                  </p>
                </div>
              </div>

              {/* Submit Button - Primary Button Pattern (Rounded-full, Accent, Hover Lift) */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={formState.status === "submitting"}
                  className="w-full text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform shadow-xl hover:scale-[1.01] hover:shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed"
                  style={{ backgroundColor: ACCENT }}
                >
                  {formState.status === "submitting" ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Mise à jour...
                    </span>
                  ) : (
                    "Mettre à jour l'article"
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
