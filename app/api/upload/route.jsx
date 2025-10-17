import { NextResponse } from "next/server";
import path from "path";
import { randomBytes } from "crypto";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("image");

    if (!file || !(file instanceof File)) {
      console.error("No file uploaded.");
      return NextResponse.json(
        { error: "Aucun fichier téléchargé." },
        { status: 400 },
      );
    }

    // Check if it's an image
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Seuls les fichiers image sont autorisés." },
        { status: 400 },
      );
    }

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Le fichier est trop volumineux (max 5MB)." },
        { status: 400 },
      );
    }

    // Generate unique filename
    const ext = path.extname(file.name);
    const uniqueSuffix = Date.now() + "-" + randomBytes(16).toString("hex");
    const filename = `image-${uniqueSuffix}${ext}`;

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Supabase storage
    const { data, error } = await supabase.storage
      .from('blogs')
      .upload(filename, buffer, {
        contentType: file.type,
      });

    if (error) {
      console.error("Error uploading to Supabase:", error);
      return NextResponse.json(
        { error: "Erreur lors du téléchargement de l'image." },
        { status: 500 },
      );
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('blogs')
      .getPublicUrl(data.path);

    console.log("File uploaded successfully:", publicUrlData.publicUrl);

    return NextResponse.json({ filePath: publicUrlData.publicUrl });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Erreur lors du téléchargement de l'image." },
      { status: 500 },
    );
  }
}
