import { Request, Response, NextFunction } from "express";
import * as phoneService from "../services/phoneService";
import { PhoneRequestDTO } from "../protocols/PhoneProtocol";


export const phoneController = {

  async createPhone(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const phoneData = req.body as PhoneRequestDTO;
    try {
      const newPhone = await phoneService.createPhone(phoneData);
      return res.status(201).send(newPhone);
    } catch (error) {
      next(error);
    }
  },


  async listPhones(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {


      const phones = await phoneService.listAllPhones();



      return res.status(200).send(phones);
    } catch (error) {
      next(error);
    }
  },


  async deletePhone(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { phoneNumber } = req.params;


      await phoneService.removePhoneByNumber(phoneNumber);

      
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};