import { Router, Request, Response } from 'express';
import MatchesController from '../controllers/MatchesController';
import AuthValidations from '../middlewares/AuthValidation';
import MatchValidations from '../middlewares/MatchValidations';

const matchesController = new MatchesController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchesController.getAllMatches(req, res));
router.patch('/:id/finish', AuthValidations, (req: Request, res: Response) =>
  matchesController.finishMatch(req, res));
router.patch('/:id', AuthValidations, (req: Request, res: Response) =>
  matchesController.updateMatch(req, res));
router.post('/', AuthValidations, MatchValidations, (req: Request, res: Response) =>
  matchesController.registerNewMatch(req, res));

export default router;
