import express = require('express');
import LeaderBoard from '../controller/LeaderBoard';

const router = express.Router();

const leaderBoardControl = new LeaderBoard();

router.get('/', leaderBoardControl.leaderBoardHome);

export default router;
