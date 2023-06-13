import { Router, Request, Response } from 'express';
import TeamsController from '../controllers/TeamsControllers';

const teamsController = new TeamsController();

const router = Router();

router.get('/', (req: Request, res: Response) => teamsController.geAllTeams(req, res));
router.get('/:id', (req: Request, res: Response) => teamsController.getTeamById(req, res));

export default router;
