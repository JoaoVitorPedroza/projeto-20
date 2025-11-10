import { phoneRepository } from '../repositories/phoneRepository';
import { rechargeRepository } from '../repositories/rechargeRepository';
import { NotFoundError, ConflictError } from '../utils/errors';
// Assumindo que você tem um DTO ou interface de protocolo
import { PhoneRequestDTO } from '../protocols/PhoneProtocol';

// --------------------------------------------------------------------------
// 1. LISTAGEM GERAL (GET /phones) - O problema que estávamos resolvendo
// --------------------------------------------------------------------------
export async function listAllPhones(): Promise<any[]> {
    return phoneRepository.getPhones();
}

// --------------------------------------------------------------------------
// 2. LISTAGEM POR DOCUMENTO (Corrigindo o Erro de Tipagem)
// --------------------------------------------------------------------------
export async function listPhonesByClientDocument(clientDocument: string): Promise<any[]> {
    // Chama a função findByClientDocument do Repositório
    return phoneRepository.findByClientDocument(clientDocument);
}

// --------------------------------------------------------------------------
// 3. CRIAÇÃO
// --------------------------------------------------------------------------
export async function createPhone(phoneData: PhoneRequestDTO): Promise<any> {
    const { phoneNumber } = phoneData;

    // 1. Validação de Conflito: O número já existe?
    const existingPhone = await phoneRepository.findByPhoneNumber(phoneNumber);
    if (existingPhone) {
        throw new ConflictError("Telefone já cadastrado.");
    }

    // 2. Criação
    return phoneRepository.createPhone(phoneData);
}

// --------------------------------------------------------------------------
// 4. EXCLUSÃO
// --------------------------------------------------------------------------
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

    // 3. Exclusão
    await phoneRepository.deleteByPhoneNumber(phoneNumber);
}

// --------------------------------------------------------------------------
// 5. RECARGAS
// --------------------------------------------------------------------------
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

// --------------------------------------------------------------------------
// 6. EXPORTAÇÃO FINAL DO OBJETO SERVICE
// --------------------------------------------------------------------------
export const phoneService = {
    createPhone,
    listAllPhones,
    listPhonesByClientDocument, // <--- CORREÇÃO INCLUÍDA
    removePhoneByNumber,
    listRechargesByPhone,
    rechargePhone,
}

export default phoneService;