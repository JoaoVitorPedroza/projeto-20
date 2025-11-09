// src/services/rechargeService.ts

import { rechargeRepository } from '../repositories/rechargeRepository';
import { phoneRepository } from '../repositories/phoneRepository';
import { NotFoundError } from '../utils/errors';
//import { ConflictError } from '../utils/errors'; // Necessário para validação de conflito (embora não seja o foco aqui)

// Definindo um tipo simples para a requisição de recarga
type RechargeRequestDTO = {
    phoneNumber: string;
    amount: number;
};

/**
 * Registra uma nova recarga no sistema.
 * Realiza validações de existência do telefone e de valor.
 */
export async function listRechargesByPhone(phoneNumber: string) {

    // 1. Verificar se o telefone existe (Requisito: se não existir, 404)
    const phone = await phoneRepository.findByPhoneNumber(phoneNumber);

    if (!phone) {
        throw new NotFoundError('Telefone não encontrado. Não é possível listar as recargas.');
    }

    // 2. Buscar o histórico de recargas usando o ID do telefone
    const recharges = await rechargeRepository.findRechargesByPhone(phone.id);

    // O requisito diz que se o telefone existir, mas não tiver recargas,
    // retorna 200 OK com array vazio. O repository já garante isso.
    return recharges;
}
export async function createRecharge(rechargeData: RechargeRequestDTO) {
    const { phoneNumber, amount } = rechargeData;

    // 1. Validação de Telefone Não Encontrado (Requisito 5)
    const phone = await phoneRepository.findByPhoneNumber(phoneNumber);

    if (!phone) {
        // ESSENCIAL: Lançar o erro HttpError para que o Controller possa pegá-lo
        throw new NotFoundError('Telefone não cadastrado. Não é possível realizar a recarga.');
    }

    // O Service pode também verificar as validações do Schema (10 a 1000),
    // mas estas são geralmente feitas primeiro pelo ValidationMiddleware.
    // Se o ValidationMiddleware falhar, esta parte do Service nem é executada.

    // ------------------------------------------------------------------
    // 2. Lógica de Negócio: Criar Recarga
    // ------------------------------------------------------------------

    // Cria o objeto de dados que o Repository espera (ID do telefone e o valor)
    const recordData = {
        phoneId: phone.id,
        amount: amount,
    };

    const newRecharge = await rechargeRepository.createRecharge(recordData);

    // Retorna o novo registro de recarga
    return newRecharge;
}


// ------------------------------------------------------------------
// Exemplo de outras funções de serviço (se necessário)
// ------------------------------------------------------------------

export async function getSummary() {
    return rechargeRepository.getRechargesSummary();
}

// ------------------------------------------------------------------
// Exportação do Módulo Service
// ------------------------------------------------------------------
export const rechargeService = {
    createRecharge,
    getSummary,
    listRechargesByPhone,
    // Adicione outras funções aqui, como listRechargesByPhoneNumber, etc.
};
//testar a recarga pelo thunder e conferir a execuçaõ do setup.sql