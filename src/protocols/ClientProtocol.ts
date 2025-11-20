
export interface ClientDB {
  id: number;
  document: string;
}
export interface ClientProtocol {
    document: string;
    name: string;
    
}
export interface ClientDB { /* ... */ }
export interface ClientDB { /* ... */ }
export type ClientCreationDTO = Omit<ClientDB, 'id'>;