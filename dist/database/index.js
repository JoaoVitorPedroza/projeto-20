"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = __importDefault(require("pg"));
var Pool = pg_1.default.Pool;
require("dotenv/config");
var databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
    console.error('❌ FATAL: A variável de ambiente DATABASE_URL não está definida.');
    throw new Error('DATABASE_URL is not set.');
}
console.log('DEBUG: Conectando ao DB...');
var connection = new Pool({
    connectionString: databaseUrl,
    ssl: {
        rejectUnauthorized: false
    }
});
connection.connect()
    .then(function () { return console.log('✅ Conectado ao PostgreSQL com sucesso!'); })
    .catch(function (err) {
    console.error('❌ Erro na conexão com PostgreSQL:', err.message);
    process.exit(1);
});
exports.default = connection;
