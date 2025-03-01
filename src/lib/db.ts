// lib/db.ts
import Database from 'better-sqlite3';

// Define the path to your SQLite database file
const db = new Database('database.db');

// Define the structure of a User (optional, for type safety)
export interface User {
  id: number;
  name: string;
  email: string;
}
export interface DbUser {
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

export const getAllUsers = (): DbUser[] => {
  return db.prepare('SELECT * FROM users').all() as DbUser[];
};

export const getUserById = (id: string): DbUser | undefined => {
    return db.prepare('SELECT * FROM users WHERE id = ?').get(id) as DbUser;
}

export const createUser = (name: string, email: string): number => {
    const stmt = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)');
    const result = stmt.run(name, email);
    return result.lastInsertRowid as number;
}
export const updateUser = (id: string, name: string, email: string): number => {
    const stmt = db.prepare('UPDATE users SET name = ?, email = ? WHERE id = ?');
    const result = stmt.run(name, email, id);
    return result.changes;
}

export const deleteUser = (id:string): number => {
    const stmt = db.prepare('DELETE FROM users WHERE id = ?');
    const result = stmt.run(id);
    return result.changes;
}

export default db;
