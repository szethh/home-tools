import { building } from '$app/environment';
import { drizzle, type BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { env } from '$env/dynamic/private';

let db: BetterSQLite3Database;

if (!building) {
	const sqlite = new Database(env.DB_PATH ?? 'sqlite.db');
	db = drizzle(sqlite);
}

export { db };
