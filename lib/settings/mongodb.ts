import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb+srv://admin:NNLDUhSHvIuAahI0@lasheesbypriidb.cgsp3qp.mongodb.net/";
if (!uri) {
  // Keep strict: do not hardcode secrets. Ask user to set MONGODB_URI.
  throw new Error("Missing MONGODB_URI env var. Add it to .env.local");
}

export const mongoDbName = process.env.MONGODB_DB || "lasheesbyprii";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function getDb() {
  const c = await clientPromise;
  return c.db(mongoDbName);
}

