import express = require('express');
import LeaderBoard from '../controller/LeaderBoard';

const router = express.Router();

const leaderBoardControl = new LeaderBoard();

router.get('/', leaderBoardControl.leaderBoard);
router.get('/home', leaderBoardControl.leaderBoardHome);
router.get('/away', leaderBoardControl.leaderBoardAway);

export default router;
