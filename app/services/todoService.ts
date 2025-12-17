import * as SQLite from "expo-sqlite";

// Saya ganti nama DB biar tabel dibuat ulang dengan struktur baru (ada updated_at)
const DATABASE_NAME = "final_project_smes5.db";

let db: SQLite.SQLiteDatabase | null = null;

async function getDB() {
  if (!db) {
    db = await SQLite.openDatabaseAsync(DATABASE_NAME);
  }
  return db;
}

export type Todo = {
  id?: number;
  text: string;
  done: number;       
  created_at?: string;
  updated_at?: string; // Kolom wajib untuk fitur tanggal update
};

/** Init Database, Table, & Seed Data */
export async function initDB(): Promise<void> {
  const db = await getDB();

  // 1. Buat Tabel dengan kolom updated_at
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      done INTEGER NOT NULL DEFAULT 0,
      created_at DATETIME DEFAULT (datetime('now', 'localtime')),
      updated_at DATETIME DEFAULT (datetime('now', 'localtime'))
    );
  `);

  // 2. Fitur FILL (Isi data otomatis jika kosong)
  const result = await db.getAllAsync<{ count: number }>("SELECT COUNT(*) as count FROM todos");
  if (result[0].count === 0) {
    await db.execAsync(`
      INSERT INTO todos (text, done) VALUES 
      ('Mengerjakan Final Project', 0),
      ('Belanja Bulanan', 0),
      ('Install React Native', 1);
    `);
    console.log("Database seeded automatically.");
  }
}

/** Get All */
export async function getTodos(): Promise<Todo[]> {
  const db = await getDB();
  // Urutkan berdasarkan update terakhir
  return await db.getAllAsync<Todo>("SELECT * FROM todos ORDER BY updated_at DESC;");
}

/** Add */
export async function addTodo(text: string): Promise<number> {
  const db = await getDB();
  const result = await db.runAsync(
    "INSERT INTO todos (text, done) VALUES (?, 0);",
    [text]
  );
  return result.lastInsertRowId ?? 0;
}

/** Update (Status / Text) + Update Tanggal */
export async function updateTodo(
  id: number,
  fields: { text?: string; done?: number }
): Promise<void> {
  const db = await getDB();
  const sets: string[] = [];
  const params: any[] = [];

  if (fields.text !== undefined) {
    sets.push("text = ?");
    params.push(fields.text);
  }
  if (fields.done !== undefined) {
    sets.push("done = ?");
    params.push(fields.done);
  }

  // LOGIC PENTING: Update kolom updated_at setiap kali edit
  sets.push("updated_at = datetime('now', 'localtime')");

  if (sets.length === 0) return;
  params.push(id);

  await db.runAsync(
    `UPDATE todos SET ${sets.join(", ")} WHERE id = ?;`,
    params
  );
}

/** Delete */
export async function deleteTodo(id: number): Promise<void> {
  const db = await getDB();
  await db.runAsync("DELETE FROM todos WHERE id = ?;", [id]);
}