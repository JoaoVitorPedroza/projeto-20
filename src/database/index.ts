// src/database/index.ts (VERSÃO FINAL)
import pg from 'pg';
const { Pool } = pg;
import 'dotenv/config';
console.log('DEBUG: DATABASE_URL lida pelo Node:', process.env.DATABASE_URL);
const useSSL = process.env.DATABASE_URL?.includes('localhost') ? false : { rejectUnauthorized: false };

const config = {
    connectionString: process.env.DATABASE_URL,

    ssl: { rejectUnauthorized: false }
};

const connectionStringWithSSL = process.env.DATABASE_URL + '?sslmode=require';

const connection = new Pool({
    connectionString: connectionStringWithSSL,
    ssl: { rejectUnauthorized: false }
});

connection.connect()
    .then(() => console.log('✅ Conectado ao PostgreSQL com sucesso!'))
    .catch(err => {
        // Agora, o erro será exibido
        console.error('❌ Erro na conexão com PostgreSQL:', err.message);
    });

export default connection;