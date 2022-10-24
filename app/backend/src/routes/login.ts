import express = require('express');
import LoginController from '../controller/Login';

const router = express.Router();

const loginControl = new LoginController();

router.post('/', loginControl.findByEmailAndPassword);

export default router;
