import { Request, Response, NextFunction } from 'express';
import Authentication from '../utils/Authentication';

export default class TokenAuthentication {
  authentication: Authentication;

  constructor() {
    this.authentication = new Authentication();
  }

  validate = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    if (!this.authentication.verify(authorization)) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    next();
  };
}
