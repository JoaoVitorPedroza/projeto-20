
import connection from '../database/index';
type RechargeRequestDTO = any;
type RechargeDB = any;


/**
 * L
 * @returns {Promise<any[]>} L
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
 * C
 * @param {object} rechargeData - D
 * @returns {Promise<RechargeDB>} O
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
 * O
 * @returns {Promise<{ totalAmountSpent: string, totalRechargesCount: string }>}
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