import { Request, Response } from 'express';
import Service from '../service/Login';

export default class Login {
  service: Service;

  construtor() {
    this.service = new Service();
  }

  findByEmailAndPassword = async (req: Request, res: Response) => {
    const findBy = await this.service.findByEmailAndPassword(req.body);
    if (findBy === null) {
      return res.status(200).json({ message: 'inexistente' });
    } return res.status(200).json({ message: 'existente' });
  };
}
