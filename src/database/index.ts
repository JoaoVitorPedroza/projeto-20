import pg from 'pg';
const { Pool } = pg;
import 'dotenv/config';


const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    console.error('❌ FATAL: A variável de ambiente DATABASE_URL não está definida.');

    throw new Error('DATABASE_URL is not set.');
}

console.log('DEBUG: Conectando ao DB...');

const connection = new Pool({
    connectionString: databaseUrl,


    ssl: {
        rejectUnauthorized: false
    }
});

connection.connect()
    .then(() => console.log('✅ Conectado ao PostgreSQL com sucesso!'))
    .catch(err => {

        console.error('❌ Erro na conexão com PostgreSQL:', err.message);
        
        process.exit(1);
    });

export default connection;