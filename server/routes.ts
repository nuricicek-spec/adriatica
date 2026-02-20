import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.dummy.get.path, async (req, res) => {
    const dummys = await storage.getDummys();
    res.json(dummys);
  });

  return httpServer;
}