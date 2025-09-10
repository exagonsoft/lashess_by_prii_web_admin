import { promises as fs } from "fs";
import { join } from "path";

type Service = {
  id: string;
  name: string;
  price: number;
  durationMin: number;
  active: boolean;
};

type DB = {
  services: Service[];
};

const DB_PATH = join(process.cwd(), "data", "db.json");

async function ensure() {
  try {
    await fs.access(DB_PATH);
  } catch {
    const initial: DB = {
      services: [
        { id: crypto.randomUUID(), name: "Clásicas", price: 45, durationMin: 90, active: true },
        { id: crypto.randomUUID(), name: "Híbridas", price: 60, durationMin: 105, active: true },
      ],
    };
    await fs.mkdir(join(process.cwd(), "data"), { recursive: true });
    await fs.writeFile(DB_PATH, JSON.stringify(initial, null, 2), "utf8");
  }
}

async function read(): Promise<DB> {
  await ensure();
  const raw = await fs.readFile(DB_PATH, "utf8");
  return JSON.parse(raw) as DB;
}

async function write(db: DB) {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), "utf8");
}

export async function listServices(): Promise<Service[]> {
  const db = await read();
  return db.services;
}

export async function getService(id: string): Promise<Service | undefined> {
  const db = await read();
  return db.services.find((s) => s.id === id);
}

export async function createService(input: Partial<Service>): Promise<Service> {
  const db = await read();
  const item: Service = {
    id: crypto.randomUUID(),
    name: String(input.name ?? ""),
    price: Number(input.price ?? 0),
    durationMin: Number(input.durationMin ?? 60),
    active: input.active ?? true,
  };
  db.services.push(item);
  await write(db);
  return item;
}

export async function updateService(id: string, input: Partial<Service>): Promise<Service | undefined> {
  const db = await read();
  const idx = db.services.findIndex((s) => s.id === id);
  if (idx === -1) return undefined;
  db.services[idx] = { ...db.services[idx], ...input, id };
  await write(db);
  return db.services[idx];
}

export async function deleteService(id: string): Promise<boolean> {
  const db = await read();
  const before = db.services.length;
  db.services = db.services.filter((s) => s.id !== id);
  await write(db);
  return db.services.length < before;
}

