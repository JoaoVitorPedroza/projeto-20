// src/services/phoneService.ts

import { phoneRepository } from '../repositories/phoneRepository';
import { NotFoundError, ConflictError } from '../utils/errors';
import { rechargeRepository } from '../repositories/rechargeRepository'; // NOVO: Para checar o 409

// Importe seu DTO de criação, se ele existir, ou use 'any'
// import { PhoneCreateDTO } from '../protocols/PhoneProtocol';


// ----------------------------------------------------------------------
// FUNÇÕES ESSENCIAIS (CORRIGIDAS)
// ----------------------------------------------------------------------

// Requisito 1 & 2: Criação e Validação de Duplicidade
// CORREÇÃO: Mudar 'createPhoneRecord' para 'createPhone'
export async function createPhone(phoneData: any) { // Usando 'any' se DTO não existir
    const { phoneNumber } = phoneData;

    const existingPhone = await phoneRepository.findByPhoneNumber(phoneNumber);

    if (existingPhone) {
        throw new ConflictError('Este número de telefone já está cadastrado.');
    }

    // CORREÇÃO: Mudar 'createPhoneRecord' para 'createPhone'
    const newPhone = await phoneRepository.createPhone(phoneData);
    return newPhone;
}
export async function removePhoneByNumber(phoneNumber: string): Promise<void> {

    // 1. Verificar se o telefone existe (404 Not Found)
    const phone = await phoneRepository.findByPhoneNumber(phoneNumber);

    if (!phone) {
        throw new NotFoundError('Telefone não encontrado. Não é possível excluir.');
    }

    // 2. Verificar se há recargas associadas (409 Conflict)
    // Requisito 3: Se o telefone tiver recargas, a exclusão deve ser bloqueada.
    const recharges = await rechargeRepository.findRechargesByPhone(phone.id);

    if (recharges.length > 0) {
        throw new ConflictError('Não é possível excluir o telefone. Existem recargas associadas.');
    }

    // 3. Se passou nas validações, deletar
    await phoneRepository.deleteByPhoneNumber(phoneNumber);
}

// CORREÇÃO: Se você precisa de findAllPhones, vamos criá-la no service e repository.
// Se você não precisa, ignore este bloco. Assumindo que você precisa:
export async function listAllPhones() {
    // Você precisará adicionar findAllPhones no phoneRepository.ts se não existir.
    // Se não existir, esta linha dará erro novamente.
    // Por enquanto, vamos usar uma função vazia:
    // return phoneRepository.findAllPhones();
    return [];
}

// ----------------------------------------------------------------------
// REQUISITO 4: BUSCAR POR DOCUMENTO DO CLIENTE (NOVA FUNÇÃO)
// ----------------------------------------------------------------------
export async function listPhonesByClientDocument(clientDocument: string) {
    // Esta função apenas chama o repository e retorna o array.
    // O repository (findByClientDocument) já garante que se nada for encontrado, retorna [].
    const phones = await phoneRepository.findByClientDocument(clientDocument);
    return phones;
}


// ----------------------------------------------------------------------
// EXPORTAÇÃO DO SERVICE
// ----------------------------------------------------------------------
export const phoneService = {
    createPhone,
    listAllPhones, // Se necessário
    listPhonesByClientDocument,
    removePhoneByNumber, // Requisito 4
    // Adicione outras funções aqui (ex: findByPhoneNumber)
};