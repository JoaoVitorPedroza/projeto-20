// src/database/index.ts

import 'dotenv/config'; // Garante que as variáveis de ambiente sejam carregadas
import pg from 'pg';

// A string de conexão será pega da variável de ambiente DATABASE_URL
// Essa variável é essencial para o deploy no Render
const { Pool } = pg;
let connectionString = process.env.DATABASE_URL;

// Verifica se a variável de ambiente existe
if (!connectionString) {
  console.error("Variável de ambiente DATABASE_URL não definida!");
  // Em ambiente de produção, seria um erro fatal
  throw new Error("DATABASE_URL is not set.");
}

// Configuração opcional para o Render (quando for fazer o deploy)
// if (process.env.NODE_ENV === "production") {
//   connectionString = {
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//       rejectUnauthorized: false
//     }
//   };
// }


// Cria o pool de conexões com o PostgreSQL
const db = new Pool({
  connectionString
});

console.log("Conectado ao PostgreSQL com sucesso.");

// Exporta o pool para que os Repositórios possam executar queries
export default db;