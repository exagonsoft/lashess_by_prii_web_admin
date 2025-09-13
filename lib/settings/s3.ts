import { S3Client } from "@aws-sdk/client-s3";
import { systemSecrets } from "./systemSecrets";

export const s3 = new S3Client({
  region: systemSecrets.cloud.region,
  credentials: {
    accessKeyId: systemSecrets.cloud.accessKeyId,
    secretAccessKey: systemSecrets.cloud.secretAccessKey,
  },
});
