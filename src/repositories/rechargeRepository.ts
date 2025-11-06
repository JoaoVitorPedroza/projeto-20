// src/repositories/rechargeRepository.ts
import connection from '../database/index';

/**
 * Busca todas as recargas feitas, juntando dados do telefone e cliente.
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