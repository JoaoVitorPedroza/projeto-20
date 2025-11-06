import { PhoneDB, PhoneRequestDTO } from "../protocols/PhoneProtocol"; // OK
import { phoneRepository } from "../repositories/phoneRepository"; // OK
import { clientRepository } from "../repositories/clientRepository"; // OK
export class NotFoundError extends Error {
  statusCode = 404;
  constructor(message: string) {
    super(message);
    this.name = "NotFoundError";
  }
}
export class ConflictError extends Error {
  statusCode = 409;
  constructor(message: string) {
    super(message);
    this.name = "ConflictError";
  }
}
const MAX_PHONES_PER_CLIENT = 3;
/**
 * @param phoneData Os dados do telefone e cliente
 * @returns O registro do telefone criado
 */
async function createPhone(phoneData: PhoneRequestDTO): Promise<PhoneDB> {
  const { clientDocument, phoneNumber } = phoneData;
  const existingPhone = await phoneRepository.findByPhoneNumber(phoneNumber);
  if (existingPhone) {
    throw new ConflictError("O número de telefone já está cadastrado.");
  }

  let client = await clientRepository.findByDocument(clientDocument);
  if (!client) {
    client = await clientRepository.createClient({ document: clientDocument });
  }
  const phoneCount = await phoneRepository.countClientPhones(clientDocument);
  if (phoneCount >= MAX_PHONES_PER_CLIENT) {
    throw new ConflictError(
      `O cliente com documento ${clientDocument} já atingiu o limite de ${MAX_PHONES_PER_CLIENT} telefones cadastrados.`
    );
  }
  const newPhone = await phoneRepository.createPhone(phoneData);

  return newPhone;
}

export const phoneService = {
  createPhone,
};
