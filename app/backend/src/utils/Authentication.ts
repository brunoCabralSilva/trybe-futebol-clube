const jwt = require('jsonwebtoken');
import { JwtConfig, LoginAuthenticate } from '../interfaces/login';

export default class Authentication {
  jwtConfig: JwtConfig;
  payload: LoginAuthenticate;
  tokenSecret: string;
  token: string;

  constructor() {
    this.tokenSecret = process.env.JWT_SECRET || 'jwt_secret';
    this.jwtConfig = {
      expiresIn: '1000min',
      algorithm: 'HS256',
    };
  }

  public generateTolkien = (body: LoginAuthenticate): string => {
    const { id, username, role, email } = body;
    this.token = jwt.sign(
      { id, username, role, email },
      this.tokenSecret,
      this.jwtConfig
    );
    return this.token;
  };

  public verify = (token: string): string | boolean => {
    try {
    const validate = jwt.verify(token, this.tokenSecret);
    return validate;
    } catch (error) {
      return false;
    }
  }
};

