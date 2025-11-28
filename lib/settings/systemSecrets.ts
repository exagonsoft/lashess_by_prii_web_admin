// lib/settings/systemSecrets.ts

function getEnvVar(key: string, fallback: string = "", required = true): string {
  const value = process.env[key] || fallback;
  if (!value && required) {
    throw new Error(`Missing required env var: ${key}`);
  }
  return value;
}

const publicConfig = {
  apiBase:
    process.env.NEXT_PUBLIC_API_BASE ??
    process.env.NEXT_PUBLIC_BASE_URL ??
    "http://localhost:3000",

  firebaseClient: {
    apiKey:
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
      "AIzaSyBJb_vfJwfKlJJfl3Q3QQLOQ6e7JLGRn8w",
    authDomain:
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
      "lashess-by-prii.firebaseapp.com",
    projectId:
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "lashess-by-prii",
    storageBucket:
      process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ||
      "lashess-by-prii.firebasestorage.app",
    messagingSenderId:
      process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "302024968063",
    appId:
      process.env.NEXT_PUBLIC_FIREBASE_APP_ID ||
      "1:302024968063:web:4dba822d78069e065fbc4a",
    measurementId:
      process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-B6GB71YN0C",
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
    return getEnvVar(
      "MONGODB_URI",
      "mongodb+srv://admin:NNLDUhSHvIuAahI0@lasheesbypriidb.cgsp3qp.mongodb.net/"
    );
  },
  get mongoDb() {
    return getEnvVar("MONGODB_DB", "lasheesbypriidb");
  },

  // Cloud
  get cloud() {
    return {
      region: getEnvVar("CLOUD_REGION", "us-east-1"),
      accessKeyId: getEnvVar("CLOUD_ACCESS_KEY_ID", "AKIAYT3ARFVDHZKLZZC7"),
      secretAccessKey: getEnvVar(
        "CLOUD_SECRET_ACCESS_KEY",
        "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"
      ),
      bucket: getEnvVar("CLOUD_BUCKET", "lashees-by-prii-bucket"),
    } as const;
  },

  // Google Cloud
  get google_cloud() {
    return {
      projectId: getEnvVar("GOOGLE_CLOUD_PROJECT_ID", "lashess-by-pri-web-admin"),
      clientEmail: getEnvVar("GOOGLE_CLIENT_EMAIL", "lashess-by-pri-web-admin@appspot.gserviceaccount.com"),
      privateKey: getEnvVar(
        "GOOGLE_CLOUD_PRIVATE_KEY",
        "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCWaBcbkG9coYSn\nrs2ZfmDLaCWYNDuaxtJOKBLxK3lYi4BFKpuSv4Pwmv5ywEWAqatqZM/ckRW7/ysQ\nheT/lsmp8OwvFEIFb5I+RiZjj4IOlL67C3qsFZQnkwYh4PzHmeBvUncofWVPb+S6\nAq6JEoqb846OAsR9450vn6cVaqIs10cCXeLkfq459PqcuffABb1020Ob01+Y83Kr\nDPva2xy+nf5OiLSXYOMR6iiNF0JOuEx42GqmVPezDjppZNRGSm8cVOo37wAJSoL3\nxcCHKXLI5ASvUxDOhVWyoQ+ehBpEgupZYTRADCz6XRFPn1FJ3gQGYh0H/hYXT+E5\ncovjnJRXAgMBAAECggEACMp7s0Y9ZA4iuURLyxFqaekj7WH8K988EopgFQ2D8atx\nq1lCr5CXDxyYC6/2P/9qv/S1e4BVY2AWLciNqmyvS8oDm/rUowmy5AXon4AXS2/h\nOACDQoSeXLPIs3k5fRce2ZLZ2Rl/LuXs2fxnJCbbyCKzrdQ2lN8VZF+x/dv2L6Ws\nlc/xZWwZGPeDhnVJ66OsMyThBecZ+wy11mVoyeWVCymATsbjwBj6uiBlBjdw1hiW\nSyWQSyYp2FvTZQxwhdVxUOXlTS3HCn2ZW7CqZvEnMobW4Nxxv7qMjsoMLLnVdop2\nYoeZqXXjTGaeCRyymCtciXPHvhXEom7C5cdEW+mi9QKBgQDCHYehU13EL3DrFc5e\nte9qNJ7HoTGyBSi005TwF3prPybumof09THny4bx/2YOVd1Cwet8ud3q3coWTh8o\nDuNyWXe9vO4sRy9uMCbexJUfXVb+Pb70kAxBG/8i2bfHcapcnkNBQWjw7Qoy429t\nWQm0l/hkKhUrNtjusw/lCIOJFQKBgQDGW1QFIFmWIRBxGof+KTmF429Mgm0Fr2oL\nDxcPc7Bti/47KKUevH/+YCSl9Htu4c2+6fYW4KN+aZ8uxk5sRflW5RFbMOooDIOM\nuVEmbDqPqDtc4KG8mIrnydGcpv2Q6z6cbzrxBOISoVy7FiigFOvr7k7o0+rw8fK7\nSR9xaWIquwKBgQCDJp53ojLNFVyOiOoo1XWP5UOOD1vbMl8hZX7QhJxij4WHWoMX\nPv7b5IglQvC6KMtYilrHp3DHedhLH7cvQnfrz4T2fgrRgbsLEJ+CjYFPcqoPFrrI\n0/Zjmz3TVxQzPZnj/83i7gWwGgd1AHNNhwXmrXLWghRRYTpKdFL95LWyTQKBgQCy\nQPqVjMfVWatb6RrTNhrijkvD9uWgmU3z2EDB+xZOq+LxKQqSP5XKdH4awUV3lOZ/\nreMgFgn3HVYXA9EQDiYPh9V8HM4g5XYGrbcWj2ZlGSsXwSq3wGH8AOslGxB9/loK\n3Q6b7+Z2FZqu6i/iBEsrf8JcC61zkAqxcfoWwjyc5wKBgGII4/VSNNEH7oFCJmRv\nfqHBXUpcJKVTR76BGHnscYIQSbivCosTogmdwLUlM2EtHsgRnhOhufEVqVa0oxyv\nEFPwj0Zvea4nZvH+0mxUFTRPJyyMavwLOz+TT5lKqyGtt+cUy7dsjVNJUXw69/p6\ngTMmo8+Oj6ruRNilboFfY1lB\n-----END PRIVATE KEY-----\n"
      ),
      bucket: getEnvVar("GOOGLE_CLOUD_BUCKET", "lashess_by_prii_media"),
    } as const;
  },

  // Firebase Client (frontend-safe)
  firebaseClient: publicConfig.firebaseClient,

  // Firebase Admin SDK (server only)
  get firebaseAdmin() {
    const projectId = getEnvVar("FIREBASE_PROJECT_ID", "lashess-by-prii");
    const clientEmail = getEnvVar(
      "FIREBASE_CLIENT_EMAIL",
      "firebase-adminsdk-fbsvc@lashess-by-prii.iam.gserviceaccount.com"
    );
    const privateKey = getEnvVar(
      "FIREBASE_PRIVATE_KEY",
      `-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCTNxfaVUkjkqIg\npj1b4fJEU3zrY88mv7pf2lbyEu4Q3b992QdHIK1FYnLXUFo2t5IWOIyXHr84lFb9\n+zR8b71RICcYxrX6UjJ0tX52za+J+DtYCKTnqvM1+qVs24ZE9zIZt4/ABP0OFUJf\nODNSejL4e7GJL0t9pHN2Uiyb1+DSflZvM1bXUklL2x45FbAn6Sc8yljOxLh3ERwf\nmlV22EbR7rTU1z9Icy1zmcsBbsukFt6zfDPjDM/5hnzt1n9SoceflDkUCKXVKFV7\ngpOdmS1aqnpzWZXcMkRk9oKJ8j2cDT/KzWeU106V2dEnRylpAHW/s+ox9UpQLGMg\nnomvSJgDAgMBAAECggEAFCjKuOjN67OkRQFOzLrLsMSYCinwT5eYv5CIMH0cIa4k\nD2k9YGWepK4/GLIVsIGB3U4gHn+k4uwZX41bWiD5FVdoUzG+8Mj5xNanu0AeZi/a\nfIsufdUAmic5KQeEwwPw1em3oy1rs9aAcMai7Iv0V+ekX6tc1JdFAnJtTmgJDvnt\nvjq5OeUqd2LKO0JUpj7XZqm6wZ8aIecaWzPRB4Zee6jIsfTlBv0c/LAQLj73coMq\nBajAMJHUDVFKx7LjPrVuexN5tZ2k3upYXOVsM6TNDyC0DAfpnded8pPKGgASu6kF\n4xdnkLlSugGXHE0tmZJDW/2KkslyRIVnfMUlMJYHdQKBgQDNarWQyTW7V14oimsM\nE+XwRce3z1+tQBW3gQH/strpAllUEUOWYRMfNgPGTu7hA42t7laBy3hhLtNCSxRz\nlUn89OEMdi0o2pqAyjbI5RP000rwgzrqe+R3AiSQ+2r80EWw0VlGP+46Vf7VX+5L\nh/kGzltey25K6xbXr/XXeghi/wKBgQC3d2gCmLuvyNZPznTJr8LB9+e0DogJfSW+\n5K08yC+SGMzdIJSzj7LkyObnzn42uAX1g49UPB7DOPDBWLrqiJDvxye0w98Y1s5C\n75KlViajturWQ9Bn+ly6HJWJRj2F3QBhJTP8lmS1gfQjs/EUkbCeYyZ3c7SX/d/1\nsRRaA/s+/QKBgQCMbc3wTE3KZCD/sBkcaaIBT4MIeuFarHvsNmqqZphXQP7WhPLi\npDyRUrjj4mRWObqq1EwZcYM7VOqh4Hf7yGyLXNFZVpTq3/9N2m/3iPvKnIQXxm8J\njGcUoMdkwixS5wMtrQDOELiI8u9C6dEbm7o31+0I8iPVXcAA9c8oXsnK+wKBgECk\n/i0MC/XgWkM8h8IZABLAew/inuRZCFe+05u7HafovSadOEgctfgPIe1DwQ0ewlrD\nxFj15hD7mzlFPnctL4SNM9xpt85UwdCsAYvoUy0UYqKkumYovUuGjtoTudHVETEp\nnqu9gjbCV3fNC4En5Ieqf/9O8a8scSFtB7K//GMxAoGAH950iN88Kjh8Y3c83AXn\nleuTC4HoR0aPXjJWX8e6ZRvvlOEzu9pEyB1vBvvEngzWZy4jWKyCpA5uhuoI7PVW\nigrapSMyHDO9jjBSJAXG4WXVqe4c/PB3vTBesgiMQY36WcJ3kssjYOW9qpHiZpJn\nTbCqDIOZ+2sTeQsU5sqO5Ho=\n-----END PRIVATE KEY-----\n`
    ).replace(/\\n/g, "\n");
    const privateKeyId = getEnvVar(
      "FIREBASE_PRIVATE_KEY_ID",
      "d1d16ce8d5fb782a7b792003316329124b4bc5f4"
    );
    const clientId = getEnvVar(
      "FIREBASE_CLIENT_ID",
      "100161955437053758414"
    );

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
