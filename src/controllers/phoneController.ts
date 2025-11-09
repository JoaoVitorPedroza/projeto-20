import { Request, Response, NextFunction } from "express";
import * as phoneService from "../services/phoneService"; // Usar phoneService para lógica de negócio
import { PhoneRequestDTO } from "../protocols/PhoneProtocol";
// Importe outras dependências como *phoneRepository se necessário

export const phoneController = {
  // 1. CRIAÇÃO DE TELEFONE (POST /phones)
  async createPhone(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const phoneData = req.body as PhoneRequestDTO;
    try {
      const newPhone = await phoneService.createPhone(phoneData);
      return res.status(201).send(newPhone);
    } catch (error) {
      next(error);
    }
  },

  // 2. LISTAGEM DE TELEFONES (GET /phones) - CORREÇÃO DO ERRO TS2339
  // Assumindo que você tem uma função para listar todos os telefones.
  async listPhones(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      // ATENÇÃO: Se o seu serviço não tem findAllPhones, use a função correta.
      // Substituí a chamada incorreta (que causou o erro TS2339) por uma listagem de exemplo.
      const phones = await phoneService.listAllPhones();

      // Se a sua listagem é por documento, você deve usar:
      // const { clientDocument } = req.query;
      // const phones = await phoneService.findByClientDocument(clientDocument as string);

      return res.status(200).send(phones);
    } catch (error) {
      next(error);
    }
  },

  // 3. EXCLUSÃO DE TELEFONE (DELETE /phones/:phoneNumber)
  async deletePhone(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { phoneNumber } = req.params;

      // Assumindo que o Service implementa a validação e a exclusão
      await phoneService.removePhoneByNumber(phoneNumber);

      // 204 No Content para exclusão bem-sucedida
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};