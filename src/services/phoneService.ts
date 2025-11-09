// src/services/phoneService.ts

import { phoneRepository } from '../repositories/phoneRepository';
import { NotFoundError, ConflictError } from '../utils/errors';
import { rechargeRepository } from '../repositories/rechargeRepository';
export async function createPhone(phoneData: any) {
    const { phoneNumber } = phoneData;

    const existingPhone = await phoneRepository.findByPhoneNumber(phoneNumber);

    if (existingPhone) {
        throw new ConflictError('Este número de telefone já está cadastrado.');
    }
    const newPhone = await phoneRepository.createPhone(phoneData);
    return newPhone;
}
export async function removePhoneByNumber(phoneNumber: string): Promise<void> {
    const phone = await phoneRepository.findByPhoneNumber(phoneNumber);

    if (!phone) {
        throw new NotFoundError('Telefone não encontrado. Não é possível excluir.');
    }
    const recharges = await rechargeRepository.findRechargesByPhone(phone.id);

    if (recharges.length > 0) {
        throw new ConflictError('Não é possível excluir o telefone. Existem recargas associadas.');
    }
    await phoneRepository.deleteByPhoneNumber(phoneNumber);
}
export async function listAllPhones() {

    return [];
}
export async function listPhonesByClientDocument(clientDocument: string) {
    const phones = await phoneRepository.findByClientDocument(clientDocument);
    return phones;
}
export const phoneService = {
    createPhone,
    listAllPhones,
    listPhonesByClientDocument,
    removePhoneByNumber,
};