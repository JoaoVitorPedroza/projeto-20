import connection from '../database/index';

export async function createPhone(phoneData: any): Promise<any> {
    const { clientDocument, phoneNumber, carrierName, name, description } = phoneData;

    const result = await connection.query(
        `
        INSERT INTO "public"."phones" 
            (client_document, phone_number, carrier_name, name, description)
        VALUES 
            ($1, $2, $3, $4, $5)
        RETURNING *;
        `,
        [clientDocument, phoneNumber, carrierName, name, description]
    );
    return result.rows[0];
}

export async function getPhones(): Promise<any[]> {
    const result = await connection.query(
        `
        SELECT 
            id, 
            client_document AS clientDocument, 
            phone_number AS phoneNumber, 
            carrier_name AS carrierName, 
            name, 
            description 
        FROM "public"."phones"; 
        `
    );
    return result.rows;
}

export async function findByPhoneNumber(phoneNumber: string): Promise<any | null> {
    const result = await connection.query(
        `
        SELECT id, phone_number AS phoneNumber, client_document AS clientDocument 
        FROM "public"."phones" 
        WHERE phone_number = $1;
        `,
        [phoneNumber]
    );
    return result.rows[0] || null;
}

export async function findByClientDocument(clientDocument: string): Promise<any[]> {
    const result = await connection.query(
        `
        SELECT 
            id, 
            client_document AS clientDocument, 
            phone_number AS phoneNumber, 
            carrier_name AS carrierName, 
            name, 
            description 
        FROM "public"."phones" 
        WHERE client_document = $1;
        `,
        [clientDocument]
    );
    return result.rows;
}
export async function deleteByPhoneNumber(phoneNumber: string): Promise<void> {
    await connection.query(
        `
        DELETE FROM "public"."phones" 
        WHERE phone_number = $1;
        `,
        [phoneNumber]
    );
}


export const phoneRepository = {
    createPhone,
    getPhones,
    findByPhoneNumber,
    findByClientDocument,
    deleteByPhoneNumber,
}