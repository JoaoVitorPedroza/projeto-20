// src/repositories/rechargeRepository.ts
import connection from '../database/index';

/**
 * craa uma nova recarga para um telefone específico.
 * @returns {Promise<any[]>} Lista de todas as recargas.
 */
export async function findAllRecharges() {
    const result = await connection.query(`
        SELECT
            r.id,
            r."phone_id" AS phoneId,
            r.amount,
            r.data_hora_recharge AS rechargeDate,
            p.phone_number AS phoneNumber,
            c.document AS clientDocument
        FROM
            recharges r
        JOIN
            phones p ON r.phone_id = p.id
        JOIN
            clients c ON p.client_document = c.document
        ORDER BY
            r.data_hora_recharge DESC;
    `);
    return result.rows;
}
/**
 * @returns {Promise<{ sum: string, count: string }>} O resumo financeiro.
 */
export async function getRechargesSummary() {
    const result = await connection.query(`
        SELECT 
            SUM(amount) AS totalAmountSpent, 
            COUNT(id) AS totalRechargesCount 
        FROM 
            recharges;
    `);
    return result.rows[0];
}