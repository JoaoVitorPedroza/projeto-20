// src/controllers/rechargeController.ts

import { Request, Response } from "express";
import { phoneRepository } from "../repositories/phoneRepository";
import { rechargeRepository } from '../protocols/rechargeRepository';
import { RechargeRequestDTO, RechargeDB } from "../protocols/RechargeProtocol";
import { PhoneDB } from "../protocols/PhoneProtocol";

export const rechargeController = {
  // 🎯 POST /recharges: Cria uma nova recarga
  async createRecharge(req: Request, res: Response): Promise<Response> {
    // Aqui você usaria o validateSchema(rechargeSchema) para validar req.body
    const { phoneNumber, amount } = req.body as RechargeRequestDTO;

    try {
      // 1. Verificar se o telefone existe
      const phone: PhoneDB | null = await phoneRepository.findByPhoneNumber(
        phoneNumber
      );
      if (!phone) {
        return res.status(404).send({ message: "Telefone não encontrado." });
      }

      // 2. Lógica de validação do valor (Ex: valor deve ser positivo)
      if (amount <= 0) {
        return res
          .status(400)
          .send({ message: "O valor da recarga deve ser positivo." });
      }

      // 3. Registrar a recarga (usando o phone.id como FK)
      const newRecharge: RechargeDB = await rechargeRepository.createRecharge(
        phone.id,
        amount
      );

      // 4. Resposta de sucesso
      // Retornamos 201 Created e a nova recarga (ou uma mensagem de sucesso)
      return res.status(201).send(newRecharge);
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Erro ao processar recarga." });
    }
  },

  // 🎯 GET /recharges: Lista o histórico de recargas
  async getRecharges(req: Request, res: Response): Promise<Response> {
    // Você pode usar query parameters para filtrar, mas vamos começar listando tudo
    const { phoneNumber } = req.query;

    try {
      if (!phoneNumber || typeof phoneNumber !== "string") {
        // Se a rota for GET /recharges?phoneNumber=, precisamos do número
        return res
          .status(400)
          .send({ message: "O parâmetro 'phoneNumber' é obrigatório." });
      }

      // 1. Verificar se o telefone existe
      const phone: PhoneDB | null = await phoneRepository.findByPhoneNumber(
        phoneNumber
      );
      if (!phone) {
        return res.status(404).send({ message: "Telefone não encontrado." });
      }

      // 2. Buscar recargas pelo ID do telefone
      const recharges: RechargeDB[] =
        await rechargeRepository.findRechargesByPhone(phone.id);

      // 3. Resposta de sucesso
      return res.status(200).send(recharges);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send({ message: "Erro ao buscar histórico de recargas." });
    }
  },

  // 🎯 GET /summary: Implementação do resumo
async getSummary(req: Request, res: Response): Promise<Response> {
    try {
      // 1. Chamar o novo método do repository para buscar o resumo
      const summaryData = await rechargeRepository.getGlobalSummary();

      // 2. Resposta de sucesso
      return res.status(200).send(summaryData);

    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Erro ao gerar resumo." });
    }
  },
};
