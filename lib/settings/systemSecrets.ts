// lib/settings/systemSecrets.ts

// Helper for server-only required vars
function getEnvVar(key: string, required = true): string {
  const value = process.env[key];
  if (!value && required) {
    throw new Error(`Missing required env var: ${key}`);
  }
  return value || "";
}

const publicConfig = {
  apiBase:
    process.env.NEXT_PUBLIC_API_BASE ??
    process.env.NEXT_PUBLIC_BASE_URL ??
    "",
  firebaseClient: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
    messagingSenderId:
      process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "",
  },
};

export const systemSecrets = {
  // Flags
  isProd: process.env.NODE_ENV === "production",

  // API base
  baseUrl: publicConfig.apiBase,
  apiBase: publicConfig.apiBase,

  // Mongo
  get mongoUri() {
    return getEnvVar("MONGODB_URI");
  },
  get mongoDb() {
    return getEnvVar("MONGODB_DB");
  },

  // Cloud
  get cloud() {
    return {
      region: getEnvVar("CLOUD_REGION"),
      accessKeyId: getEnvVar("CLOUD_ACCESS_KEY_ID"),
      secretAccessKey: getEnvVar("CLOUD_SECRET_ACCESS_KEY"),
      bucket: getEnvVar("CLOUD_BUCKET"),
    } as const;
  },

  // Firebase Client (frontend-safe)
  firebaseClient: publicConfig.firebaseClient,

  // Firebase Admin SDK (server only)
  get firebaseAdmin() {
    const projectId = getEnvVar("FIREBASE_PROJECT_ID");
    const clientEmail = getEnvVar("FIREBASE_CLIENT_EMAIL");
    const privateKey = getEnvVar("FIREBASE_PRIVATE_KEY").replace(/\\n/g, "\n");
    const privateKeyId = getEnvVar("FIREBASE_PRIVATE_KEY_ID");
    const clientId = getEnvVar("FIREBASE_CLIENT_ID");

    return {
      type: "service_account",
      project_id: projectId,
      private_key_id: privateKeyId,
      private_key: privateKey,
      client_email: clientEmail,
      client_id: clientId,
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url:
        "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${clientEmail}`,
      universe_domain: "googleapis.com",
    } as const;
  },
} as const;
