
export interface ClientDB {
  id: number;
  document: string; // Ex: CPF/CNPJ
}
export type ClientCreationDTO = Omit<ClientDB, 'id'>;

export interface ClientDB { /* ... */ }
export interface ClientDB { /* ... */ }
export type ClientCreationDTO = /* ... */;