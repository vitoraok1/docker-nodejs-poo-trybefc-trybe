import { Router } from 'express';
import teamsRouter from './teams.routes';
import matchRouter from './matches.routes';
import userRouter from './user.routes';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/matches', matchRouter);
router.use('/', userRouter);

export default router;
