// src/protocols/RechargeProtocol.ts
export interface RechargeRequestDTO {
    phoneNumber: string;
    amount: number; 
}
export interface RechargeDB {
    id: number;
    phoneId: number;
    amount: number;
    rechargeDate: Date;
}