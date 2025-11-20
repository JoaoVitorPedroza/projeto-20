import { phoneRepository } from '../repositories/phoneRepository';
import { rechargeRepository } from '../repositories/rechargeRepository';
import { clientRepository } from '../repositories/clientRepository';
import { NotFoundError, ConflictError } from '../utils/errors';

import { PhoneRequestDTO } from '../protocols/PhoneProtocol';


export async function listAllPhones(): Promise<any[]> {
    return phoneRepository.getPhones();
}


export async function listPhonesByClientDocument(clientDocument: string): Promise<any[]> {
    // C
    return phoneRepository.findByClientDocument(clientDocument);
}


export async function createPhone(phoneData: PhoneRequestDTO): Promise<any> {
    // T
    const { phoneNumber, clientDocument, name } = phoneData;

    // T
    const existingPhone = await phoneRepository.findByPhoneNumber(phoneNumber);
    if (existingPhone) {
        throw new ConflictError("Telefone já cadastrado.");
    }
    // I
    await clientRepository.createClient({ document: clientDocument, name });

    //I
    return phoneRepository.createPhone(phoneData);
}


export async function removePhoneByNumber(phoneNumber: string): Promise<void> {
    // V
    const phone = await phoneRepository.findByPhoneNumber(phoneNumber);
    if (!phone) {
        throw new NotFoundError("Telefone não encontrado para exclusão.");
    }

    // R
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

/**
 * @description NOVA FUNÇÃO
 * CHAMAR NO CLIENT
 */
export async function deleteClient(clientDocument: string): Promise<void> {
    await clientRepository.deleteClient(clientDocument);

}


export const phoneService = {
    createPhone,
    listAllPhones,
    listPhonesByClientDocument,
    removePhoneByNumber,
    listRechargesByPhone,
    rechargePhone,
    deleteClient, 
}

export default phoneService;