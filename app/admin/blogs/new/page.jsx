"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveNewBlog } from "lib/actions";
import { ShareIcon, AlertTriangle } from "lucide-react";
import { Editor } from "@tinymce/tinymce-react";

export default function NewBlog() {
  const router = useRouter();
  const [formState, setFormState] = useState({
    status: "idle", // idle, submitting, success, error
    message: "",
    shareOnSocial: true,
  });
  const [content, setContent] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormState({ ...formState, status: "submitting", message: "" });

    const formData = new FormData(event.target);

    // Handle image upload
    const imageFile = formData.get("image");
    if (imageFile && imageFile.size > 0) {
      const uploadFormData = new FormData();
      uploadFormData.append("image", imageFile);

      try {
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
        formData.append("imagePath", uploadResult.filePath); // Add the uploaded image path to the form data
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
    }

    formData.append("content", content);
    formData.append("shareOnSocial", formState.shareOnSocial);

    try {
      const result = await saveNewBlog(formData);
      if (result.success) {
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
      console.error("Blog save failed:", error);
      setFormState({
        ...formState,
        status: "error",
        message: "Une erreur s'est produite. Veuillez réessayer.",
      });
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Nouvel Article</h1>
      </div>

      {formState.status === "error" && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-6 flex items-start">
          <AlertTriangle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <p>{formState.message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Content - Left Side */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="title"
              >
                Titre *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="excerpt"
              >
                Extrait *
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                rows="3"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              ></textarea>
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="content"
              >
                Contenu *
              </label>
              <Editor
                id="tiny-editor"
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
                    "print",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "paste",
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

          {/* Sidebar - Right Side */}
          <div className="space-y-6">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="category"
              >
                Catégorie *
              </label>
              <select
                id="category"
                name="category"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Sélectionner une catégorie</option>
                <option value="Education">Éducation</option>
                <option value="Sante">Santé</option>
                <option value="Environnement">Environnement</option>
                <option value="Culture">Culture</option>
                <option value="Solidarite">Solidarité</option>
              </select>
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="image"
              >
                Image principale
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="tags"
              >
                Tags
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Séparés par des virgules"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Status
              </label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <input
                    id="status-published"
                    name="status"
                    type="radio"
                    value="published"
                    defaultChecked
                    className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="status-published"
                    className="ml-2 block text-sm text-gray-700"
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
                    className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="status-draft"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Brouillon
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
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
                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="share-social"
                  className="ml-2 block text-sm text-gray-700 font-medium"
                >
                  Partager sur les réseaux sociaux
                </label>
              </div>

              <div className="text-sm text-gray-600 flex items-start">
                <ShareIcon className="h-5 w-5 mr-2 text-blue-600 flex-shrink-0" />
                <p>
                  Lorsque vous publiez cet article, il sera automatiquement
                  partagé sur vos comptes sociaux liés.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={formState.status === "submitting"}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 disabled:opacity-70"
              >
                {formState.status === "submitting"
                  ? "Publication..."
                  : "Publier l'article"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
