
export interface ClientDB {
  id: number;
  document: string; // Ex: CPF/CNPJ
}


export interface ClientDB { /* ... */ }
export interface ClientDB { /* ... */ }
export type ClientCreationDTO = Omit<ClientDB, 'id'>;