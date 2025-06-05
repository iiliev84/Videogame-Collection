import pg from "pg";
const db = new pg.Client(process.env.DATABASE_URL || 'the pg database credentials');
export default db;
