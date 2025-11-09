// src/controllers/rechargeController.ts
import { Request, Response } from "express";
import { phoneRepository } from "../repositories/phoneRepository";
import { rechargeRepository } from '../repositories/rechargeRepository';
import { RechargeRequestDTO, RechargeDB } from "../protocols/RechargeProtocol";
import { PhoneDB } from "../protocols/PhoneProtocol";
import { NextFunction } from "express";


export const rechargeController = {
  // ADICIONE next: NextFunction AQUI
  async createRecharge(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const { phoneNumber, amount } = req.body as RechargeRequestDTO;

    try {
      // NOTA: O tratamento de 404 DEVE ir para o Service para manter o Controller limpo,
      // mas vamos manter o seu código atual e apenas corrigir o erro do catch.

      const phone: PhoneDB | null = await phoneRepository.findByPhoneNumber(phoneNumber);

      if (!phone) {
        // CORREÇÃO: LANCE UM ERRO HttpError PARA QUE O MIDDLEWARE O CAPTURE E RETORNE 404
        // (Isso assume que você removeu o tratamento 404 do Service, se ele estava lá)
        // Se você não usa HttpError, o código no catch abaixo é o único caminho.

        // Se preferir manter o código:
        return res.status(404).send({ message: "Telefone não encontrado." });
      }

      if (amount <= 0) {
        return res.status(400).send({ message: "O valor da recarga deve ser positivo." });
      }

      const newRecharge: RechargeDB = await rechargeRepository.createRecharge(phone.id, amount);

      return res.status(201).send(newRecharge);

    } catch (error) {
      // CORREÇÃO ESSENCIAL: PASSAR O ERRO PARA O HANDLER GLOBAL
      // Isso enviará o erro para o errorHandlerMiddleware, que retornará 404, 409 ou 500.
      return next(error);
    }
  },

  // APLIQUE A MESMA CORREÇÃO NAS OUTRAS FUNÇÕES:
  async getRecharges(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const { phoneNumber } = req.query;

    try {
      // ... sua lógica de sucesso
    } catch (error) {
      return next(error); // CORREÇÃO
    }
  },

  async getSummary(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      // ... sua lógica de sucesso
    } catch (error) {
      return next(error); // CORREÇÃO
    }
  },
};