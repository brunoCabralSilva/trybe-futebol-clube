import express = require('express');

import LoginController from '../controller/Login';
import LoginMiddleware from '../middlewares/LoginMid';

const router = express.Router();

const loginControl = new LoginController();
const loginMiddleware = new LoginMiddleware();

router.post(
  '/',
  loginMiddleware.emailValidate,
  loginMiddleware.passwordValidate,
  loginControl.findUser,
);
router.get('/validate', loginControl.validate);

export default router;
