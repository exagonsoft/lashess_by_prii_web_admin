import { Storage } from "@google-cloud/storage";
import { systemSecrets } from "./systemSecrets";

export const gcs = new Storage({
  projectId: systemSecrets.google_cloud.projectId,
  credentials: {
    client_email: systemSecrets.google_cloud.clientEmail,
    private_key: systemSecrets.google_cloud.privateKey.replace(/\\n/g, "\n"),
  },
});
