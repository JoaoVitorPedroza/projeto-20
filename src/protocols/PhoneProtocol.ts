
export interface PhoneRequestDTO {
    clientDocument: string;
    phoneNumber: string;
    carrierName: string;
    name: string;
    description: string;
}

export interface PhoneProtocol {
    id: number;
    client_document: string;
    phoneNumber: string;
    carrierName: string;
    name: string;
    description: string;
}