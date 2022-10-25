import { NextFunction, Request, Response } from 'express';

const validateEmail = /\S+@\S+\.\S+/;

export default class LoginMid {
  emailValidate = (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    if (!email || email === '') {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!validateEmail.test(email)) {
      return res.status(400).json({ message: 'Incorrect email or password' });
    }
    next();
  };

  passwordValidate = (req: Request, res: Response, next: NextFunction) => {
    const { password } = req.body;
    if (!password || password === '') {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    next();
  };
}
