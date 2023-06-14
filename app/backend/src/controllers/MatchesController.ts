import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) { }

  public async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    const allMatches = await this.matchesService.getAllMatches(inProgress as string | undefined);
    return res.status(200).json(allMatches);
  }

  public async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const match = await this.matchesService.finishMatch(Number(id));
    return res.status(200).json(match.message);
  }
}
