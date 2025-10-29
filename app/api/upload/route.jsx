import { NextResponse } from "next/server";
import path from "path";
import { randomBytes } from "crypto";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(request) {
  console.log("[UPLOAD START] Starting upload process");
  console.log("[UPLOAD INFO] Request headers:", Object.fromEntries(request.headers.entries()));

  try {
    const formData = await request.formData();
    console.log("[UPLOAD DEBUG] FormData received");

    const file = formData.get("image");
    console.log("[UPLOAD DEBUG] File from formData:", file ? "present" : "null");

    if (!file || !(file instanceof File)) {
      console.error("[UPLOAD DEBUG] No file uploaded or invalid file type");
      console.error("[UPLOAD DEBUG] File value:", file);
      console.error("[UPLOAD DEBUG] File instanceof File:", file instanceof File);
      return NextResponse.json(
        { error: "Aucun fichier téléchargé." },
        { status: 400 },
      );
    }

    console.log("[UPLOAD INFO] File details:", {
      name: file.name,
      type: file.type,
      size: file.size,
      sizeInMB: (file.size / (1024 * 1024)).toFixed(2) + "MB"
    });

    // Check if it's an image
    if (!file.type.startsWith("image/")) {
      console.error("[UPLOAD DEBUG] File is not an image. Type:", file.type);
      return NextResponse.json(
        { error: "Seuls les fichiers image sont autorisés." },
        { status: 400 },
      );
    }

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      console.error("[UPLOAD DEBUG] File too large. Size:", file.size);
      return NextResponse.json(
        { error: "Le fichier est trop volumineux (max 5MB)." },
        { status: 400 },
      );
    }

    // Generate unique filename
    const ext = path.extname(file.name);
    const uniqueSuffix = Date.now() + "-" + randomBytes(16).toString("hex");
    const filename = `image-${uniqueSuffix}${ext}`;
    console.log("[UPLOAD INFO] Generated filename:", filename);

    // Convert file to buffer
    console.log("[UPLOAD INFO] Converting file to buffer...");
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    console.log("[UPLOAD INFO] Buffer created, size:", buffer.length);

    // Check Supabase configuration (runtime validation as backup)
    console.log("[UPLOAD INFO] Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL ? "configured" : "missing");
    console.log("[UPLOAD INFO] Supabase Service Key:", process.env.SUPABASE_SERVICE_ROLE_KEY ? "configured" : "missing");

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error("[UPLOAD ERROR] Runtime Supabase configuration check failed");
      return NextResponse.json(
        {
          error: "Configuration Supabase manquante.",
          code: "SUPABASE_CONFIG_MISSING",
          details: "Les variables d'environnement Supabase ne sont pas configurées."
        },
        { status: 500 },
      );
    }

    // Use the admin client for storage operations with service role permissions
    console.log("[UPLOAD INFO] Starting Supabase upload to 'blogs' bucket...");
    const startTime = Date.now();
    const { data, error } = await supabaseAdmin.storage
      .from('blogs')
      .upload(filename, buffer, {
        contentType: file.type,
      });
    const uploadTime = Date.now() - startTime;
    console.log(`[UPLOAD INFO] Upload completed in ${uploadTime}ms`);

    if (error) {
      console.error("[UPLOAD ERROR] Supabase upload error:", error);
      console.error("[UPLOAD ERROR] Error details:", JSON.stringify(error, null, 2));

      // More specific error handling based on error type
      let errorMessage = "Erreur lors du téléchargement de l'image.";
      let errorCode = "UPLOAD_FAILED";
      let statusCode = 500;

      if (error.message?.includes("Bucket not found")) {
        errorMessage = "Le bucket de stockage n'existe pas.";
        errorCode = "BUCKET_NOT_FOUND";
      } else if (error.message?.includes("Permission denied")) {
        errorMessage = "Permissions insuffisantes pour le téléchargement.";
        errorCode = "PERMISSION_DENIED";
      } else if (error.message?.includes("File too large")) {
        errorMessage = "Le fichier est trop volumineux pour Supabase.";
        errorCode = "FILE_TOO_LARGE";
        statusCode = 400;
      } else if (error.message?.includes("Invalid file type")) {
        errorMessage = "Type de fichier non supporté par Supabase.";
        errorCode = "INVALID_FILE_TYPE";
        statusCode = 400;
      } else if (error.message?.includes("Duplicate")) {
        errorMessage = "Un fichier avec ce nom existe déjà.";
        errorCode = "DUPLICATE_FILE";
        statusCode = 409;
      }

      return NextResponse.json(
        {
          error: errorMessage,
          code: errorCode,
          details: error.message || "Erreur inconnue lors du téléchargement."
        },
        { status: statusCode },
      );
    }

    console.log("[UPLOAD SUCCESS] Supabase upload successful, data:", data);

    // Get public URL
    const { data: publicUrlData } = supabaseAdmin.storage
      .from('blogs')
      .getPublicUrl(data.path);

    console.log("[UPLOAD SUCCESS] Public URL generated:", publicUrlData.publicUrl);

    console.log("[UPLOAD SUCCESS] Upload process completed successfully");
    return NextResponse.json({
      filePath: publicUrlData.publicUrl,
      filename: filename,
      size: file.size,
      type: file.type
    });
  } catch (error) {
    console.error("[UPLOAD ERROR] Unexpected error during upload:", error);
    console.error("[UPLOAD ERROR] Error stack:", error.stack);

    // Enhanced error handling for different types of unexpected errors
    let errorMessage = "Erreur lors du téléchargement de l'image.";
    let errorCode = "UPLOAD_FAILED";
    let statusCode = 500;

    if (error instanceof TypeError && error.message?.includes("fetch")) {
      errorMessage = "Erreur de connexion réseau lors du téléchargement.";
      errorCode = "NETWORK_ERROR";
    } else if (error instanceof RangeError) {
      errorMessage = "Erreur de traitement du fichier.";
      errorCode = "FILE_PROCESSING_ERROR";
    } else if (error.message?.includes("ENOTFOUND") || error.message?.includes("ECONNREFUSED")) {
      errorMessage = "Impossible de contacter le service de stockage.";
      errorCode = "SUPABASE_CONNECTION_ERROR";
    }

    return NextResponse.json(
      {
        error: errorMessage,
        code: errorCode,
        details: process.env.NODE_ENV === "development" ? error.message : "Une erreur inattendue s'est produite."
      },
      { status: statusCode },
    );
  }
}
