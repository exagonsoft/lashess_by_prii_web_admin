import * as admin from "firebase-admin";
import { createRemoteJWKSet, jwtVerify } from "jose";

// Lazily initialize Firebase Admin if service account env is present
function ensureAdmin() {
  try {
    const privateKey = (process.env.FIREBASE_PRIVATE_KEY || "").replace(/\\n/g, "\n");
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const hasServiceAccount = Boolean(privateKey && projectId && clientEmail);

    if (hasServiceAccount && !admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
    }
  } catch {
    // Swallow init errors; we'll fall back to JOSE verification below
  }
}

export const verifyIdToken = async (token: string) => {
  // First try Firebase Admin if configured
  try {
    ensureAdmin();
    if (admin.apps.length) {
      return await admin.auth().verifyIdToken(token);
    }
  } catch {
    // Fall through to JOSE verification
  }

  // Fallback: verify Firebase ID token via Google's JWKS (no service account required)
  try {
    const projectId =
      process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
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
    return payload as unknown as Record<string, unknown>;
  } catch {
    return null;
  }
};
