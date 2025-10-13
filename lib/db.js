import Database from "better-sqlite3";
import { schema } from "./db/schema";
import { initializeDb } from "./db/init";
import { migrate } from "./db/migrate";

// Singleton to maintain db connection
let db = null;
let dbPromise = null;

async function getDb() {
  if (db) return db;

  if (dbPromise) return dbPromise;

  dbPromise = (async () => {
    db = new Database("./data.sqlite");

    // Run schema, initialization, and migrations
    db.exec(schema);
    await initializeDb(db);
    migrate(db); // Run migrations

    return db;
  })();

  return dbPromise;
}

export default getDb;
