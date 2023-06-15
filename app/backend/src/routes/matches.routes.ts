import { Router, Request, Response } from 'express';
import MatchesController from '../controllers/MatchesController';
import AuthValidations from '../middlewares/AuthValidation';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));
router.patch('/:id/finish', AuthValidations, (req: Request, res: Response) =>
  matchesController.finishMatch(req, res));
router.patch('/:id', AuthValidations, (req: Request, res: Response) =>
  matchesController.updateMatch(req, res));

export default router;
