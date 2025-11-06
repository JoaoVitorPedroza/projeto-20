import 'dotenv/config';
import pg from 'pg';

const { Pool } = pg;

// Verifica se a variável de ambiente existe
if (!process.env.DATABASE_URL) {
  console.error("Variável de ambiente DATABASE_URL não definida!");
  throw new Error("DATABASE_URL is not set.");
}

// Configuração que usa a variável de ambiente e força SSL
const config = {
    connectionString: process.env.DATABASE_URL,
    // 🎯 Essencial para o Render: resolve o erro 'SSL/TLS REQUIRED'
    ssl: {
        rejectUnauthorized: false,
    }
};

// Cria o pool de conexões com a configuração correta
const db = new Pool(config);

console.log("Conectado ao PostgreSQL com sucesso.");

// Exporta o pool
export default db;