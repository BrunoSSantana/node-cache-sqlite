import { DatabaseSync } from "node:sqlite";
const database = new DatabaseSync("./db.sqlite");

export function cacheSetup() {
	database.exec(`
      CREATE TABLE IF NOT EXISTS cache (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          key TEXT UNIQUE,
          value TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          expires_at DATETIME
      );
    `);
}

export function getValue(key) {
	const row = database
		.prepare(
			"SELECT * FROM cache WHERE key = ? AND expires_at > DATETIME('now')",
		)
		.get(key);

	return row ? JSON.parse(row.value) : null;
}

export function setValue({ key, value, expiresAt }) {
	const existsData = database.prepare("SELECT * FROM cache WHERE key = ? ");

	if (existsData.get(key)) {
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
}
