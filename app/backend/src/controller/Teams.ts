import { Request, Response } from 'express';
import Service from '../service/Teams';

export default class Teams {
  service: Service;

  constructor() {
    this.service = new Service();
  }

  getAll = async (req: Request, res: Response) => {
    const getAll = await this.service.getAll();
    return res.status(200).json(getAll);
  };

  getOne = async (req: Request, res: Response) => {
    console.log(req.body.id);
    const getOne = await this.service.getOne(req.params.id);
    if (getOne) {
      return res.status(200).json(getOne);
    } return res.status(400).json({ message: '' });
  };
}
