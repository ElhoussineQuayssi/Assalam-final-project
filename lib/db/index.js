import Database from "better-sqlite3";
import { initializeDb } from "./init.js";
import path from "path";

let dbInstance = null;

export default async function getDb() {
  if (!dbInstance) {

      const dbPath = path.join(process.cwd(), "data.sqlite");
      dbInstance = new Database(dbPath);

      // Initialize the database if needed
      await initializeDb(dbInstance);


  }

  return dbInstance;
}
