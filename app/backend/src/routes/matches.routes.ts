import { Router, Request, Response } from 'express';
import MatchesController from '../controllers/MatchesController';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));
router.patch('/:id/finish', (req: Request, res: Response) =>
  matchesController.finishMatch(req, res));

export default router;
