import { phoneRepository } from '../repositories/phoneRepository';
import { rechargeRepository } from '../repositories/rechargeRepository';
import { clientRepository } from '../repositories/clientRepository'; // Importado
import { NotFoundError, ConflictError } from '../utils/errors';

import { PhoneRequestDTO } from '../protocols/PhoneProtocol';


export async function listAllPhones(): Promise<any[]> {
    return phoneRepository.getPhones();
}


export async function listPhonesByClientDocument(clientDocument: string): Promise<any[]> {
    // Chama a função findByClientDocument do Repositório
    return phoneRepository.findByClientDocument(clientDocument);
}


export async function createPhone(phoneData: PhoneRequestDTO): Promise<any> {
    // 🚨 CORREÇÃO DE TIPAGEM: Usando 'clientDocument' (camelCase do DTO)
    const { phoneNumber, clientDocument, name } = phoneData;

    // 1. Verifica se o telefone já existe
    const existingPhone = await phoneRepository.findByPhoneNumber(phoneNumber);
    if (existingPhone) {
        throw new ConflictError("Telefone já cadastrado.");
    }

    // 🚨 2. REGRA DE NEGÓCIO: GARANTIR A EXISTÊNCIA DO CLIENTE
    // Passa o 'clientDocument' (do DTO) para o repositório, que o mapeia para o campo 'document' do banco.
    // Isso resolve o erro de chave estrangeira e segue a regra do professor.
    await clientRepository.createClient({ document: clientDocument, name });

    // 3. Cria o telefone
    return phoneRepository.createPhone(phoneData);
}


export async function removePhoneByNumber(phoneNumber: string): Promise<void> {
    // 1. Verifica se o telefone existe
    const phone = await phoneRepository.findByPhoneNumber(phoneNumber);
    if (!phone) {
        throw new NotFoundError("Telefone não encontrado para exclusão.");
    }

    // 2. Regra de Negócio: Verifica se há recargas associadas
    const recharges = await rechargeRepository.findRechargesByPhone(phone.id);
    if (recharges && recharges.length > 0) {
        throw new ConflictError("Não é possível excluir o telefone. Existem recargas associadas.");
    }


    await phoneRepository.deleteByPhoneNumber(phoneNumber);
}


export async function listRechargesByPhone(phoneNumber: string): Promise<any[]> {
    const phone = await phoneRepository.findByPhoneNumber(phoneNumber);
    if (!phone) {
        throw new NotFoundError("Telefone não encontrado para listar recargas.");
    }

    return rechargeRepository.findRechargesByPhone(phone.id);
}

export async function rechargePhone(rechargeData: { phoneNumber: string, amount: number }): Promise<any> {
    const { phoneNumber, amount } = rechargeData;

    const phone = await phoneRepository.findByPhoneNumber(phoneNumber);
    if (!phone) {
        throw new NotFoundError("Telefone não encontrado para recarga.");
    }

    return rechargeRepository.createRecharge({ phoneId: phone.id, amount });
}


export const phoneService = {
    createPhone,
    listAllPhones,
    listPhonesByClientDocument,
    removePhoneByNumber,
    listRechargesByPhone,
    rechargePhone,
}

export default phoneService;