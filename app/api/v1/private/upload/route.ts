import { NextResponse } from "next/server";
import { s3 } from "@/lib/settings/s3";
import { systemSecrets } from "@/lib/settings/systemSecrets";
import { PutObjectCommand } from "@aws-sdk/client-s3";
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

    // Convert to Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Unique file name
    const key = `services/${randomUUID()}-${file.name}`;

    // Upload (⚡️ no ACL anymore)
    await s3.send(
      new PutObjectCommand({
        Bucket: systemSecrets.cloud.bucket,
        Key: key,
        Body: buffer,
        ContentType: file.type,
      })
    );

    // Public URL (if bucket policy allows public read)
    const url = `https://${systemSecrets.cloud.bucket}.s3.${systemSecrets.cloud.region}.amazonaws.com/${key}`;

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
