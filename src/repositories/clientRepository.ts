
import db from '../database/index';
import { ClientDB, ClientCreationDTO } from '../protocols/ClientProtocol';
import { QueryResult } from 'pg';
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
async function createClient(clientData: ClientCreationDTO): Promise<ClientDB> {
  const { document } = clientData;
  const result: QueryResult<any> = await db.query(
    `
      INSERT INTO clients 
        (document)
      VALUES 
        ($1)
      RETURNING *;
    `,
    [document]
  );
  return toClientDB(result.rows[0]);
}
export const clientRepository = {
  findByDocument,
  createClient,
};