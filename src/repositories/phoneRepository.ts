import db from "../database/index";
import { PhoneDB, PhoneRequestDTO } from "../protocols/PhoneProtocol";
import { QueryResult } from "pg";

function toPhoneDB(row: any): PhoneDB {
  return {
    id: row.id,
    clientDocument: row.client_document,
    phoneNumber: row.phone_number,
    carrierName: row.carrier_name,
    name: row.name,
    description: row.description,
  };
}
// ----------------------------------------------------------------------

/**
 * Verifica quantos telefones um cliente já possui cadastrados
 * @param clientDocument CPF ou Documento do cliente
 * @returns O número de telefones
 */
async function countClientPhones(clientDocument: string): Promise<number> {
  const result: QueryResult<{ count: string }> = await db.query(
    `SELECT COUNT(id) FROM phones WHERE client_document = $1;`,
    [clientDocument]
  );
  // O count sempre retorna como string no PG
  return parseInt(result.rows[0].count, 10);
}

/**
 * @param phoneNumber
 * @returns
 */
async function findByPhoneNumber(phoneNumber: string): Promise<PhoneDB | null> {
  const result: QueryResult<any> = await db.query(
    `SELECT * FROM phones WHERE phone_number = $1;`,
    [phoneNumber]
  );

  if (result.rowCount === 0) return null;
  return toPhoneDB(result.rows[0]);
}

/**
 * Insere um novo telefone no banco de dados.
 * @param phoneData Os dados do telefone a ser criado
 * @returns O registro completo do telefone criado, incluindo o ID
 */
async function createPhone(phoneData: PhoneRequestDTO): Promise<PhoneDB> {
  const { clientDocument, phoneNumber, carrierName, name, description } =
    phoneData;

  const result: QueryResult<any> = await db.query(
    `
      INSERT INTO phones 
        (client_document, phone_number, carrier_name, name, description)
      VALUES 
        ($1, $2, $3, $4, $5)
      RETURNING *;
    `,
    [clientDocument, phoneNumber, carrierName, name, description]
  );

  return toPhoneDB(result.rows[0]);
}

// 🎯 NOVA FUNÇÃO: Colocada no nível superior, fora de qualquer outra função.
/**
 * Busca todos os telefones cadastrados no banco de dados.
 * @returns Um array de objetos PhoneDB.
 */
async function findAllPhones(): Promise<PhoneDB[]> {
  const result: QueryResult<any> = await db.query(
    `SELECT id, client_document, phone_number, carrier_name, name, description FROM phones;`
  );

  // Mapeia cada linha para o tipo PhoneDB
  return result.rows.map(toPhoneDB);
}
// ----------------------------------------------------------------------


// 🎯 EXPORTAÇÃO CORRIGIDA: Lista todas as funções
export const phoneRepository = {
  countClientPhones,
  findByPhoneNumber,
  createPhone,
  findAllPhones, // Agora incluída corretamente!
};