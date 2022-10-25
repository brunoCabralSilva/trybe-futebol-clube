import jwt = require('jsonwebtoken');
import { LoginAuthenticate } from '../interfaces/login';

export default class Authentication {
  payload: LoginAuthenticate;
  tokenSecret: string;
  token: string;

  constructor() {
    this.tokenSecret = process.env.JWT_SECRET || 'jwt_secret';
  }

  public generateTolkien = (body: LoginAuthenticate): string => {
    const { id, username, role, email } = body;
    this.token = jwt.sign(
      { id, username, role, email },
      this.tokenSecret,
      { expiresIn: '1000min', algorithm: 'HS256' },
    );
    return this.token;
  };

  public verify = (token: string): boolean | string | jwt.JwtPayload => {
    try {
      const validate: string | jwt.JwtPayload = jwt.verify(token, this.tokenSecret);
      return validate;
    } catch (error) {
      return false;
    }
  };
};

