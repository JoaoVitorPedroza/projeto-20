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

    return result.rows[0] || clientData;
}

/**
 * @description Deleta o cliente pelo documento. A exclusão em cascata (telefones/recargas)
 * é tratada pelo esquema SQL do banco de dados (ON DELETE CASCADE).
 */
export async function deleteClient(document: string): Promise<number> {
    const result: QueryResult<any> = await connection.query(
        `DELETE FROM clients WHERE document = $1;`,
        [document]
    );

    // Retorna o número de linhas de clientes deletadas (0 ou 1)
    return result.rowCount;
}


export const clientRepository = {
    createClient,
    deleteClient, // <-- NOVO: A função de exclusão foi adicionada
    // Adicione getClientByDocument se necessário
};