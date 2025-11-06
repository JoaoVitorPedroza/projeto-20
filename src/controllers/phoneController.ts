// src/controllers/phoneController.ts
import { Request, Response } from "express";
import { clientRepository } from "../repositories/clientRepository";
import { phoneRepository } from "../repositories/phoneRepository";
import { PhoneDB, PhoneRequestDTO } from "../protocols/PhoneProtocol";
export const phoneController = {
  async createPhone(req: Request, res: Response): Promise<Response> {
    const phoneData = req.body as PhoneRequestDTO;

    try {
      return res
        .status(201)
        .send({ message: "Implementar lógica de sucesso aqui." });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Erro interno do servidor." });
    }
  },
  async getPhones(req: Request, res: Response): Promise<Response> {
    try {
      const phones: PhoneDB[] = await phoneRepository.findAllPhones();
      return res.status(200).send(phones);
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Erro ao buscar telefones." });
    }
  },
};
