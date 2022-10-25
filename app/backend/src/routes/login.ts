const express = require('express');
import LoginController from '../controller/Login';

const router = express.Router();

const loginControl = new LoginController();

router.post('/', loginControl.findUser);

export default router;
