import express = require('express');
import MatchesController from '../controller/Matches';

const router = express.Router();

const matchesController = new MatchesController();

router.get('/', matchesController.getAll);

export default router;
