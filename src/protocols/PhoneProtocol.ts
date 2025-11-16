// O DTO de requisição (o que o usuário envia no POST)
export interface PhoneRequestDTO {
    clientDocument: string;
    phoneNumber: string;
    carrierName: string;
    name: string;
    description: string;
}

// O Protocolo do Telefone (o que é retornado do banco, tipado)
export interface PhoneProtocol {
    id: number;
    client_document: string;
    phoneNumber: string;
    carrierName: string;
    name: string;
    description: string;
}