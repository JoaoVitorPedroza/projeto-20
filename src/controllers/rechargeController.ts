// src/controllers/rechargeController.ts
import { Request, Response } from "express";
import { phoneRepository } from "../repositories/phoneRepository";
import { rechargeRepository } from '../protocols/rechargeRepository';
import { RechargeRequestDTO, RechargeDB } from "../protocols/RechargeProtocol";
import { PhoneDB } from "../protocols/PhoneProtocol";

export const rechargeController = {
  async createRecharge(req: Request, res: Response): Promise<Response> {
    const { phoneNumber, amount } = req.body as RechargeRequestDTO;
    try {
      const phone: PhoneDB | null = await phoneRepository.findByPhoneNumber(
        phoneNumber
      );
      if (!phone) {
        return res.status(404).send({ message: "Telefone não encontrado." });
      }
      if (amount <= 0) {
        return res
          .status(400)
          .send({ message: "O valor da recarga deve ser positivo." });
      }
      const newRecharge: RechargeDB = await rechargeRepository.createRecharge(
        phone.id,
        amount
      );
      return res.status(201).send(newRecharge);
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Erro ao processar recarga." });
    }
  },
  async getRecharges(req: Request, res: Response): Promise<Response> {
    const { phoneNumber } = req.query;

    try {
      if (!phoneNumber || typeof phoneNumber !== "string") {
        return res
          .status(400)
          .send({ message: "O parâmetro 'phoneNumber' é obrigatório." });
      }
      const phone: PhoneDB | null = await phoneRepository.findByPhoneNumber(
        phoneNumber
      );
      if (!phone) {
        return res.status(404).send({ message: "Telefone não encontrado." });
      }
      const recharges: RechargeDB[] =
        await rechargeRepository.findRechargesByPhone(phone.id);
      return res.status(200).send(recharges);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send({ message: "Erro ao buscar histórico de recargas." });
    }
  },
async getSummary(req: Request, res: Response): Promise<Response> {
    try {
      const summaryData = await rechargeRepository.getGlobalSummary();
      return res.status(200).send(summaryData);

    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Erro ao gerar resumo." });
    }
  },
};
