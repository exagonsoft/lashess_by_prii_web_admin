import { getDb } from "@/lib/mongodb";
import { Filter, ObjectId } from "mongodb";

export type Service = {
  _id?: string;
  id?: string; // keep compatibility with UI
  name: string;
  price: number;
  durationMin: number;
  active: boolean;
};

const COLLECTION = "services";

type RawService = {
  _id?: ObjectId | string;
  id?: string;
  name: string;
  price: number;
  durationMin: number;
  active: boolean;
};

function toClient(s: RawService): Service {
  return {
    id: s.id ?? s._id?.toString(),
    _id: s._id?.toString(),
    name: s.name,
    price: s.price,
    durationMin: s.durationMin,
    active: s.active,
  };
}

export async function listServices(): Promise<Service[]> {
  const db = await getDb();
  const items = await db.collection<RawService>(COLLECTION).find({}).sort({ name: 1 }).toArray();
  return (items as RawService[]).map(toClient);
}

export async function getServiceById(id: string): Promise<Service | null> {
  const db = await getDb();
  const col = db.collection<RawService>(COLLECTION);
  const oid = ObjectId.isValid(id) ? new ObjectId(id) : undefined;
  const filter: Filter<RawService> = oid ? { $or: [{ id }, { _id: oid }] } : { id };
  const item = await col.findOne(filter);
  return item ? toClient(item) : null;
}

export async function createService(input: Partial<Service>): Promise<Service> {
  const db = await getDb();
  const doc = {
    id: crypto.randomUUID(),
    name: String(input.name ?? ""),
    price: Number(input.price ?? 0),
    durationMin: Number(input.durationMin ?? 60),
    active: input.active ?? true,
  } satisfies Service;
  await db.collection<RawService>(COLLECTION).insertOne(doc as RawService);
  return doc;
}

export async function updateService(id: string, input: Partial<Service>): Promise<Service | null> {
  const db = await getDb();
  const col = db.collection<RawService>(COLLECTION);
  const oid = ObjectId.isValid(id) ? new ObjectId(id) : undefined;
  const filter: Filter<RawService> = oid ? { $or: [{ id }, { _id: oid }] } : { id };
  await col.updateOne(filter, { $set: { ...input } });
  const after = await col.findOne(filter);
  return after ? toClient(after) : null;
}

export async function deleteService(id: string): Promise<boolean> {
  const db = await getDb();
  const col = db.collection<RawService>(COLLECTION);
  const oid = ObjectId.isValid(id) ? new ObjectId(id) : undefined;
  const filter: Filter<RawService> = oid ? { $or: [{ id }, { _id: oid }] } : { id };
  const res = await col.deleteOne(filter);
  return res.deletedCount === 1;
}
