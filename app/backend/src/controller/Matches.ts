import { Request, Response } from 'express';
import Service from '../service/Matches';

export default class Matches {
  service: Service;

  constructor() {
    this.service = new Service();
  }

  getAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (inProgress === 'true' || inProgress === 'false') {
      const query = await this.service.getInProgress(inProgress);
      return res.status(200).json(query);
    }

    const getAllMatches = await this.service.getAll();

    if (getAllMatches) {
      return res.status(200).json(getAllMatches);
    } return res.status(400).json({ message: 'Not Found' });
  };

  insertMatchInProgress = async (req: Request, res: Response) => {
    const insert = await this.service.insertMatchInProgress(req.body);
    if (insert) {
      return res.status(201).json(insert);
    } return res.status(404).json({ message: 'There is no team with such id!' });
  };

  finishMatch = async (req: Request, res: Response) => {
    const update = await this.service.finishMatch(req.params.id);
    return res.status(200).json({ message: update });
  };

  updateMatch = async (req: Request, res: Response) => {
    const update = await this.service.updateMatch(req.params.id, req.body);
    return res.status(200).json({ message: update });
  };
}
