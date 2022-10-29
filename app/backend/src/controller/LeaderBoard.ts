import { Request, Response } from 'express';
import LeaderBoardsServ from '../service/LeaderBoard';

export default class LeaderBoard {
  leaderBoards: LeaderBoardsServ;

  constructor() {
    this.leaderBoards = new LeaderBoardsServ();
  }

  leaderBoardHome = async (req: Request, res: Response) => {
    const matchs = await this.leaderBoards.leaderBoardHome();
    return res.status(200).json(matchs);
  };

  leaderBoardAway = async (req: Request, res: Response) => {
    const matchs = await this.leaderBoards.leaderBoardAway();
    return res.status(200).json(matchs);
  };
}
