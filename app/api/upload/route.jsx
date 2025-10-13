import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { randomBytes } from "crypto";

// Ensure the uploads directory exists
const uploadDir = path.join(process.cwd(), "public", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

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
    const filePath = path.join(uploadDir, filename);

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    fs.writeFileSync(filePath, buffer);

    const publicFilePath = `/uploads/${filename}`;
    console.log("File uploaded successfully:", publicFilePath);

    return NextResponse.json({ filePath: publicFilePath });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Erreur lors du téléchargement de l'image." },
      { status: 500 },
    );
  }
}
