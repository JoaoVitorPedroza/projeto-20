import 'dotenv/config';
import pg from 'pg';
const { Pool } = pg;
if (!process.env.DATABASE_URL) {
  console.error("Variável de ambiente DATABASE_URL não definida!");
  throw new Error("DATABASE_URL is not set.");
}
const config = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    }
};
const db = new Pool(config);
console.log("Conectado ao PostgreSQL com sucesso.");
export default db;