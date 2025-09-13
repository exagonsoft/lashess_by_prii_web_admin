// lib/settings/firebaseAdmin.ts
import { App, cert, getApps, getApp, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getMessaging } from "firebase-admin/messaging";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { systemSecrets } from "./systemSecrets";

let app: App | null = null;

// ✅ Lazily initialize or reuse Firebase Admin
export function ensureAdmin() {
  if (!app) {
    if (getApps().length === 0) {
      const sa = systemSecrets.firebaseAdmin;

      console.log("🔑 Firebase Admin init debug:", {
        projectId: sa.project_id,
        clientEmail: sa.client_email,
        keySnippet: sa.private_key.substring(0, 30) + "...",
      });

      app = initializeApp({
        credential: cert({
          projectId: sa.project_id,
          clientEmail: sa.client_email,
          privateKey: sa.private_key,
        }),
      });
    } else {
      app = getApp();
    }
  }
  return app;
}

// ✅ Verify ID token with Admin SDK, fallback to JOSE
export const verifyIdToken = async (token: string) => {
  try {
    ensureAdmin();
    return await getAuth().verifyIdToken(token);
  } catch (err) {
    console.warn("⚠️ Firebase Admin verify failed, falling back to JOSE:", err);

    try {
      const projectId = systemSecrets.firebaseClient.projectId;
      if (!projectId) return null;

      const issuer = `https://securetoken.google.com/${projectId}`;
      const JWKS = createRemoteJWKSet(
        new URL(
          "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com"
        )
      );
      const { payload } = await jwtVerify(token, JWKS, {
        issuer,
        audience: projectId,
      });
      return payload as Record<string, unknown>;
    } catch {
      return null;
    }
  }
};

// ✅ Multicast push notification
export const sendPushNotification = async (
  tokens: string[],
  title: string,
  body: string,
  data?: Record<string, string>
) => {
  ensureAdmin();
  if (!tokens?.length) return;

  const response = await getMessaging().sendEachForMulticast({
    tokens,
    notification: { title, body },
    data: data || {},
    android: { priority: "high" },
    apns: { payload: { aps: { sound: "default" } } },
  });

  console.log("✅ Notifications sent:", response.successCount);
  if (response.failureCount > 0) {
    console.warn(
      "⚠️ Failed tokens:",
      response.responses.filter((r) => !r.success)
    );
  }
};

// ✅ Topic push notification
export const sendTopicNotification = async (
  topic: string,
  title: string,
  body: string,
  data?: Record<string, string>
) => {
  ensureAdmin();
  return getMessaging().send({
    topic,
    notification: { title, body },
    data: data || {},
  });
};
