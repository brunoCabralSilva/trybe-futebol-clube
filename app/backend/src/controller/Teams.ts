import { Request, Response } from 'express';
import Service from '../service/Teams';

export default class Teams {
  service: Service;

  constructor() {
    this.service = new Service();
  }

  getall = async (req: Request, res: Response) => {
    const getAll = await this.service.getAll();
    return res.status(200).json(getAll);
  };
}
