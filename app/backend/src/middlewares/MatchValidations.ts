import { Request, Response, NextFunction } from 'express';
import TeamsService from '../services/TeamService';

async function validateMatch(req: Request, res: Response, next: NextFunction) {
  const { homeTeamId, awayTeamId } = req.body;

  const teamService = new TeamsService();

  if (homeTeamId === awayTeamId) {
    return res.status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }

  const homeId = await teamService.getTeamById(homeTeamId);
  const awayId = await teamService.getTeamById(awayTeamId);

  if (homeId.status === 'NOT_FOUND' || awayId.status === 'NOT_FOUND') {
    return res.status(404)
      .json({ message: 'There is no team with such id!' });
  }
  next();
}

export default validateMatch;
