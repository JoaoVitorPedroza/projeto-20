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
}