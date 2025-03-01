// lib/db.ts
import Database from 'better-sqlite3';

// Define the path to your SQLite database file
const db = new Database('database.db');

// Define the structure of a User (optional, for type safety)
interface User {
  id: number;
  name: string;
  email: string;
}

// Initialize the database with a table if it doesn't exist
const initDb = () => {
  const createTable = db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT
    )
  `);
  createTable.run();
};

initDb();

export default db;