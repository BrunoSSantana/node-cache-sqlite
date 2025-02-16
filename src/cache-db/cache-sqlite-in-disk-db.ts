import { DatabaseSync } from "node:sqlite";

const database = new DatabaseSync("./db.sqlite");

/**
 * Configura o banco de dados SQLite criando a tabela de cache, se necessário.
 */
export function sqliteInDiskCacheSetup() {
  try {
    database.exec(`
      CREATE TABLE IF NOT EXISTS cache (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          key TEXT UNIQUE NOT NULL,
          value TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          expires_at DATETIME NOT NULL
      );
    `);
    console.log("✅ SQLite cache setup complete");
  } catch (error) {
    console.error("❌ Error setting up SQLite cache:", error);
  }
}

/**
 * Obtém um valor do cache SQLite, verificando se ainda está válido.
 * @param {string} key - A chave do cache.
 * @returns {any} - O valor armazenado ou null se não existir ou estiver expirado.
 */
export function sqliteInDiskGetValue<T>(key: string): T | null {
  try {
    const row = database
      .prepare(
        "SELECT value FROM cache WHERE key = ? AND expires_at > DATETIME('now')",
      )
      .get(key) as { value: string } | undefined;

    return row ? JSON.parse(row.value) : null;
  } catch (error) {
    console.error(`❌ Error retrieving key "${key}" from SQLite:`, error);
    return null;
  }
}

/**
 * Define um valor no cache SQLite com um tempo de expiração.
 * Atualiza o valor se a chave já existir.
 * @param {Object} param0 - Objeto contendo key, value e expiresAt (em minutos).
 */
export function sqliteInDiskSetValue({ key, value, expiresAt = 5 }): void {
  try {
    const existing = database
      .prepare("SELECT 1 FROM cache WHERE key = ?")
      .get(key);

    if (existing) {
      database
        .prepare(
          "UPDATE cache SET value = ?, expires_at = DATETIME('now', ?) WHERE key = ?",
        )
        .run(JSON.stringify(value), `+${expiresAt} minutes`, key);
    } else {
      database
        .prepare(
          "INSERT INTO cache (key, value, expires_at) VALUES (?, ?, DATETIME('now', ?))",
        )
        .run(key, JSON.stringify(value), `+${expiresAt} minutes`);
    }
  } catch (error) {
    console.error(`❌ Error setting key "${key}" in SQLite:`, error);
  }
}
