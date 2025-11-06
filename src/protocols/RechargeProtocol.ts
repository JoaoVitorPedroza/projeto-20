// src/protocols/RechargeProtocol.ts

export interface RechargeRequestDTO {
    phoneNumber: string;
    amount: number; // Valor da recarga
}

export interface RechargeDB {
    id: number;
    phoneId: number;
    amount: number;
    rechargeDate: Date;
    // Adicione a operadora se for necessário para a resposta
}