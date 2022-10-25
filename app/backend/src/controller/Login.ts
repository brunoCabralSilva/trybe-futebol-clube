import { Request, Response } from 'express';
import Service from '../service/Login';

export default class Login {
  service: Service;

  constructor() {
    this.service = new Service();
  }

  public findUser = async (req: Request, res: Response) => {
    const findBy = await this.service.findUser(req.body);
    if (findBy) {
      return res.status(200).json({ token: findBy });
    } return res.status(401).json({ message: 'Incorrect email or password' });
  };
}
