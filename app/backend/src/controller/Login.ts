import { Request, Response } from 'express';
import Authentication from '../utils/Authentication';
import Service from '../service/Login';
import { TokenDecode } from '../interfaces/login';

export default class Login {
  service: Service;
  authenticate: Authentication;

  constructor() {
    this.service = new Service();
    this.authenticate = new Authentication();
  }

  public findUser = async (req: Request, res: Response) => {
    const findBy = await this.service.findUser(req.body);
    if (findBy) {
      return res.status(200).json({ token: findBy });
    } return res.status(401).json({ message: 'Incorrect email or password' });
  };

  public validate = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    if (authorization) {
      const validation = this.authenticate.verify(authorization) as TokenDecode;
      if (validation) return res.status(200).json({ role: validation.role });
    } return res.status(400).json({ message: 'Not Found' });
  };
}
