import express = require('express');
import TeamsController from '../controller/Teams';

const router = express.Router();

const teamsController = new TeamsController();

router.get('/', teamsController.getAll);
router.get('/:id', teamsController.getOne);

export default router;
