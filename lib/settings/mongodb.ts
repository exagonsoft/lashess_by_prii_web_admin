import { MongoClient } from "mongodb";
import { systemSecrets } from "./systemSecrets";

const uri = systemSecrets.mongoUri;
export const mongoDbName = systemSecrets.mongoDb;

// --- EXTENSIÓN DE TYPE DE GLOBALTHIS ---
declare global {
  // Agregamos el campo al type globalThis
  // (globalThis es el tipo real donde viven los globals en Node)
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!systemSecrets.isProd) {
  if (!globalThis._mongoClientPromise) {
    client = new MongoClient(uri);
    globalThis._mongoClientPromise = client.connect();
  }
  clientPromise = globalThis._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function getDb() {
  const c = await clientPromise;
  return c.db(mongoDbName);
}
