import { NextResponse } from "next/server";
import { gcs } from "@/lib/settings/gcs";
import { systemSecrets } from "@/lib/settings/systemSecrets";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const bucket = gcs.bucket(systemSecrets.google_cloud.bucket);
    const key = `services/${randomUUID()}-${file.name}`;

    // Upload to GCS (PRIVATE!)
    const blob = bucket.file(key);

    await blob.save(buffer, {
      contentType: file.type,
      resumable: false,
    });

    // Create SIGNED URL
    const [signedUrl] = await blob.getSignedUrl({
      action: "read",
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7 // 7 days
    });

    return NextResponse.json({ url: signedUrl, key });

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
