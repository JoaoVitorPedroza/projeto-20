// src/repositories/rechargeRepository.ts

import { QueryResult } from 'pg';
import db from '../database/index';
import { RechargeDB, RechargeRequestDTO } from '../protocols/RechargeProtocol';

// Helper function para converter snake_case para camelCase
function toRechargeDB(row: any): RechargeDB {
    return {
        id: row.id,
        phoneId: row.phone_id,
        amount: row.amount,
        // 🎯 CORREÇÃO AQUI: Use o nome exato do banco
        rechargeDate: row.data_hora_recharge,
    };
}
/**
 * Registra uma nova recarga.
 * @param phoneId O ID do telefone (FK)
 * @param amount O valor da recarga
 * @returns O registro completo da recarga criada
 */
async function createRecharge(phoneId: number, amount: number): Promise<RechargeDB> {
    const result: QueryResult<any> = await db.query(
        `
          INSERT INTO recharges 
            (phone_id, amount, data_hora_recharge) -- 🎯 CORREÇÃO AQUI
          VALUES 
            ($1, $2, NOW()) 
          RETURNING *;
        `,
        [phoneId, amount]
    );

    return toRechargeDB(result.rows[0]);
}

/**
 * Busca o histórico de recargas para um determinado telefone.
 * @param phoneId O ID do telefone
 * @returns Um array de recargas
 */
async function findRechargesByPhone(phoneId: number): Promise<RechargeDB[]> {
    const result: QueryResult<any> = await db.query(
        `
          SELECT * FROM recharges 
          WHERE phone_id = $1 
          ORDER BY data_hora_recharge DESC; -- 🎯 CORREÇÃO AQUI
        `,
        [phoneId]
    );

    return result.rows.map(toRechargeDB);
}

interface SummaryData {
    totalRecharges: number;
    totalAmount: number;
}

/**
 * Calcula o número total e o valor total de todas as recargas.
 */
async function getGlobalSummary(): Promise<SummaryData> {
    const result: QueryResult<any> = await db.query(
        `
          SELECT 
            COUNT(id) AS "totalRecharges",
            SUM(amount) AS "totalAmount"
          FROM recharges;
        `
    );

    const row = result.rows[0];

    return {
        // COUNT retorna um string em alguns drivers (ex: pg), convertemos para número
        totalRecharges: parseInt(row.totalRecharges) || 0,
        // SUM retorna um string/decimal, convertemos para float
        totalAmount: parseFloat(row.totalAmount) || 0,
    };
}

export const rechargeRepository = {
    createRecharge,
    findRechargesByPhone,
    getGlobalSummary, // <-- Adicionado
}