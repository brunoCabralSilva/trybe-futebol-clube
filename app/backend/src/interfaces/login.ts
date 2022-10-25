import { JwtPayload } from 'jsonwebtoken';

export interface LoginInterface {
  email: string,
  password: string,
}

export interface LoginAuthenticate {
  id: number,
  username: string,
  role: string,
  email: string,
  password: string,
}

export interface JwtDecoded {
  id: number,
  username: string,
  role: string,
  email: string,
}

export interface returnValidation extends JwtPayload {
  role: string,
}