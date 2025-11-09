
import connection from '../database/index';
// Placeholder types (se você não estiver usando um arquivo Protocol)
type RechargeRequestDTO = any;
type RechargeDB = any;


/**
 * Lista todas as recargas, juntamente com informações do telefone e cliente.
 * @returns {Promise<any[]>} Lista de todas as recargas.
 */
export async function findAllRecharges(): Promise<any[]> {
    const result = await connection.query(`
        SELECT
            r.id,
            r."phone_id" AS phoneId,
            r.amount,
            r.data_hora_recharge AS rechargeDate,
            p.phone_number AS phoneNumber,
            c.document AS clientDocument
        FROM
            "public"."recharges" r  -- CORREÇÃO: Aspas duplas e esquema
        JOIN
            "public"."phones" p ON r.phone_id = p.id -- CORREÇÃO: Aspas duplas
        JOIN
            "public"."clients" c ON p.client_document = c.document -- CORREÇÃO: Aspas duplas
        ORDER BY
            r.data_hora_recharge DESC;
    `);
    return result.rows;
}

/**
 * Cria uma nova recarga para um telefone específico.
 * @param {object} rechargeData - Dados da recarga (phoneId, amount).
 * @returns {Promise<RechargeDB>} O registro da recarga criada.
 */
export async function createRecharge(rechargeData: { phoneId: number, amount: number }): Promise<RechargeDB> {
    const { phoneId, amount } = rechargeData;
    const result = await connection.query(
        `
        INSERT INTO "public"."recharges" ("phone_id", amount, data_hora_recharge) -- CORREÇÃO: Aspas duplas e esquema
        VALUES ($1, $2, NOW()) 
        RETURNING id, "phone_id" AS phoneId, amount, data_hora_recharge AS rechargeDate;
        `,
        [phoneId, amount]
    );
    //
    return result.rows[0];
}
export async function findRechargesByPhone(phoneId: number): Promise<any[]> {
    const result = await connection.query(
        `
        SELECT 
            id, 
            phone_id AS phoneId, 
            amount, 
            data_hora_recharge AS rechargeDate  
        FROM "public"."recharges" 
        WHERE phone_id = $1
        ORDER BY data_hora_recharge DESC; 
        `,
        [phoneId]
    );
    return result.rows;
}

/**
 * Obtém o resumo financeiro das recargas.
 * @returns {Promise<{ totalAmountSpent: string, totalRechargesCount: string }>} O resumo financeiro.
 */
export async function getRechargesSummary(): Promise<any> {
    const result = await connection.query(`
        SELECT 
            SUM(amount) AS totalAmountSpent, 
            COUNT(id) AS totalRechargesCount 
        FROM 
            "public"."recharges"; -- CORREÇÃO: Aspas duplas e esquema
    `);
    return result.rows[0];
}


export const rechargeRepository = {
    findAllRecharges,
    createRecharge,
    findRechargesByPhone,
    getRechargesSummary,
};