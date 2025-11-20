import { Request, Response } from "express";
import { phoneRepository } from "../repositories/phoneRepository";
import { rechargeRepository } from '../repositories/rechargeRepository';
import { RechargeRequestDTO, RechargeDB } from "../protocols/RechargeProtocol";
import { PhoneProtocol } from "../protocols/PhoneProtocol";
import { NextFunction } from "express";


export const rechargeController = {
  async createRecharge(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const { phoneNumber, amount } = req.body as RechargeRequestDTO;

    try {
     
      const phone: PhoneProtocol | null = await phoneRepository.findByPhoneNumber(phoneNumber);

      if (!phone) {
        return res.status(404).send({ message: "Telefone não encontrado." });
      }

      if (amount <= 0) {
        return res.status(400).send({ message: "O valor da recarga deve ser positivo." });
      }

      const newRecharge: RechargeDB = await rechargeRepository.createRecharge({
    phoneId: phone.id,
    amount: amount
         });

      return res.status(201).send(newRecharge);

    } catch (error) {
      return next(error);
    }
  },
  async getRecharges(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const { phoneNumber } = req.query;

    try {
    } catch (error) {
      return next(error);
    }
  },

  async getSummary(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
    } catch (error) {
      return next(error);
    }
  },
};