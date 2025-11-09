import pg from 'pg';
const { Pool } = pg;
import 'dotenv/config';

// A chave DATABASE_URL deve ser lida diretamente do ambiente
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    console.error('❌ FATAL: A variável de ambiente DATABASE_URL não está definida.');
    // Usamos o throw aqui para garantir que o build do Render falhe se a URL não for fornecida.
    throw new Error('DATABASE_URL is not set.');
}

console.log('DEBUG: Conectando ao DB...');

// O driver PG precisa da URL pura + a configuração SSL separada para ambientes de produção.
const connection = new Pool({
    connectionString: databaseUrl, // Usa a URL pura

    // Configuração de SSL OBRIGATÓRIA para o Render,
    // que garante que a conexão será feita mesmo sem certificados específicos.
    ssl: {
        rejectUnauthorized: false
    }
});

connection.connect()
    .then(() => console.log('✅ Conectado ao PostgreSQL com sucesso!'))
    .catch(err => {
        // Agora, o erro será exibido
        console.error('❌ Erro na conexão com PostgreSQL:', err.message);
        // Garante que o processo Node saia em caso de falha crítica de conexão.
        process.exit(1);
    });

export default connection;