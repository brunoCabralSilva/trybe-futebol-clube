import express = require('express');
import MatchesController from '../controller/Matches';
import SameTeamsMid from '../middlewares/SameTeamsMid';
import TokenAuthentication from '../middlewares/TokenAuthentication';

const router = express.Router();

const matchesController = new MatchesController();
const sameTeamsMid = new SameTeamsMid();
const token = new TokenAuthentication();

router.get('/', matchesController.getAll);
router.post(
  '/',
  token.validate,
  sameTeamsMid.middleware,
  matchesController.insertMatchInProgress,
);
router.patch('/:id/finish', matchesController.finishMatch);
router.patch('/:id', matchesController.updateMatch);

export default router;
