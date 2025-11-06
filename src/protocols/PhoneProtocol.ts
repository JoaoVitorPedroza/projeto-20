// src/protocols/PhoneProtocol.ts
export type OperatorName = 'Vivo' | 'Tim' | 'Oi' | 'Claro';
export interface PhoneDB { /* ... */ }
export type PhoneRequestDTO = {
    clientDocument: string;
    phoneNumber: string;
    carrierName: 'Vivo' | 'Tim' | 'Oi' | 'Claro';
    name: string;
    description: string;
};
export interface PhoneDB {
    id: number;
    clientDocument: string;
    phoneNumber: string;
    carrierName: string;
    name: string;
    description: string;
}