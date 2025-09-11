import { S3Client } from "@aws-sdk/client-s3";

export const s3 = new S3Client({
  region: process.env.CLOUD_REGION!,
  credentials: {
    accessKeyId: process.env.CLOUD_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUD_SECRET_ACCESS_KEY!,
  },
});
