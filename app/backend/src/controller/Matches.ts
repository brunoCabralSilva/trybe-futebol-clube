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
}
