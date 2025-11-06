// src/controllers/phoneController.ts

import { Request, Response } from "express";
// Importação correta do objeto clientRepository (minúsculo)
import { clientRepository } from "../repositories/clientRepository";
import { phoneRepository } from "../repositories/phoneRepository";
// Importação correta do tipo de dados do banco
import { PhoneDB, PhoneRequestDTO } from "../protocols/PhoneProtocol";

// REMOVEMOS A INTERFACE 'Phone' pois usaremos 'PhoneDB' para evitar o erro TS2322.

export const phoneController = {
  // SEU MÉTODO EXISTENTE (CreatePhone)
  async createPhone(req: Request, res: Response): Promise<Response> {
    const phoneData = req.body as PhoneRequestDTO;

    try {
      // ... (Insira toda a sua lógica de createPhone aqui,
      // incluindo a validação de limite e unicidade de telefone) ...

      // Exemplo de retorno se tudo der certo:
      // const newPhone = await phoneRepository.createPhone(phoneData);
      // return res.status(201).send(newPhone);

      // Exemplo de retorno de erro (garanta que todos os caminhos retornem)
      // if (alguma_condicao_de_erro) {
      //    return res.status(400).send({ message: "Telefone já existe." });
      // }

      // 🎯 IMPORTANTE: Garanta que esta função SEMPRE termine com um return.
      return res
        .status(201)
        .send({ message: "Implementar lógica de sucesso aqui." });
    } catch (error) {
      console.error(error);
      // Tratamento de erro para o TS2355: Garantir que o catch retorna
      return res.status(500).send({ message: "Erro interno do servidor." });
    }
  },

  // NOVO MÉTODO (GetPhones)
  async getPhones(req: Request, res: Response): Promise<Response> {
    try {
      // 🎯 Tipo corrigido para PhoneDB[] (resolve o erro TS2322)
      const phones: PhoneDB[] = await phoneRepository.findAllPhones();

      return res.status(200).send(phones);
    } catch (error) {
      console.error(error);
      // Tratamento de erro para o TS2355: Garantir que o catch retorna
      return res.status(500).send({ message: "Erro ao buscar telefones." });
    }
  },
};
