import Database from "better-sqlite3";

  const db = new Database("./data.sqlite");

  db.close();

