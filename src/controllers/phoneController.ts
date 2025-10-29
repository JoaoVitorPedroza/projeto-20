
import { NextFunction, Request, Response } from 'express';
import { phoneService } from '../services/phoneService';

async function createPhone(req: Request, res: Response, next: NextFunction): Promise<void> {
  const phoneData = req.body;

  try {
    const newPhone = await phoneService.createPhone(phoneData);
    res.status(201).send(newPhone);

  } catch (error) {
    next(error);
  }
}

export const phoneController = {
  createPhone,
};