

import { rechargeRepository } from '../repositories/rechargeRepository';
import { phoneRepository } from '../repositories/phoneRepository';
import { NotFoundError } from '../utils/errors';
type RechargeRequestDTO = {
    phoneNumber: string;
    amount: number;
};
export async function listRechargesByPhone(phoneNumber: string) {
    const phone = await phoneRepository.findByPhoneNumber(phoneNumber);

    if (!phone) {
        throw new NotFoundError('Telefone não encontrado. Não é possível listar as recargas.');
    }
    const recharges = await rechargeRepository.findRechargesByPhone(phone.id);
    return recharges;
}
export async function createRecharge(rechargeData: RechargeRequestDTO) {
    const { phoneNumber, amount } = rechargeData;
    const phone = await phoneRepository.findByPhoneNumber(phoneNumber);

    if (!phone) {
        throw new NotFoundError('Telefone não cadastrado. Não é possível realizar a recarga.');
    }
    const recordData = {
        phoneId: phone.id,
        amount: amount,
    };

    const newRecharge = await rechargeRepository.createRecharge(recordData);
    return newRecharge;
}
export async function getSummary() {
    return rechargeRepository.getRechargesSummary();
}
export const rechargeService = {
    createRecharge,
    getSummary,
    listRechargesByPhone,
};
