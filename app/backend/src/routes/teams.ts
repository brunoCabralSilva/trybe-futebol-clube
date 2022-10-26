import express = require('express');
import TeamsController from '../controller/Teams';

const router = express.Router();

const teamsController = new TeamsController();

router.get('/', teamsController.getall);

export default router;
