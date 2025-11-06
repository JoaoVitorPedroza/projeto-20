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
    // 🎯 Adicione ESTA linha se estiver faltando!
    id: number;

    // Outros campos devem estar em camelCase se o seu repositório mapeia:
    clientDocument: string;
    phoneNumber: string;
    carrierName: string;
    name: string;
    description: string;
}