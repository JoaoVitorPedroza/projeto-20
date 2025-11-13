
import db from '../database/index';
import { ClientDB, ClientCreationDTO } from '../protocols/ClientProtocol';
import { QueryResult } from 'pg';
import connection from '../database/index';
import { ClientProtocol } from '../protocols/ClientProtocol';
function toClientDB(row: any): ClientDB {
  return {
    id: row.id,
    document: row.document,
  };
}
async function findByDocument(document: string): Promise<ClientDB | null> {
  const result: QueryResult<any> = await db.query(
    `SELECT * FROM clients WHERE document = $1;`,
    [document]
  );

  if (result.rowCount === 0) return null;
  return toClientDB(result.rows[0]);
}
export async function createClient(clientData: ClientProtocol): Promise<ClientProtocol> {
    const { document, name } = clientData;

    const result = await connection.query<ClientProtocol>(
        `
        INSERT INTO "public"."clients" 
            (document, name)
        VALUES 
            ($1, $2)
        ON CONFLICT (document) DO NOTHING
        RETURNING *;
        `,
        [document, name]
    );

    // Retorna o cliente inserido ou nulo se houver conflito (já existia e não foi inserido)
    return result.rows[0] || clientData;
}

export const clientRepository = {
    createClient,
    // Adicione getClientByDocument se necessário
};