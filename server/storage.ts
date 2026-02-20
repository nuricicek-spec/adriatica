import { db } from "./db";
import { dummy, type Dummy } from "@shared/schema";

export interface IStorage {
  getDummys(): Promise<Dummy[]>;
}

export class DatabaseStorage implements IStorage {
  async getDummys(): Promise<Dummy[]> {
    return await db.select().from(dummy);
  }
}

export const storage = new DatabaseStorage();