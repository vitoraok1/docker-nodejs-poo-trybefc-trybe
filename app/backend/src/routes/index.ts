import { Router } from 'express';
import teamsRouter from './teams.routes';
import matchRouter from './matches.routes';
import userRouter from './user.routes';
import leaderBoardRouter from './leaderboard.routes';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/', userRouter);
router.use('/matches', matchRouter);
router.use('/leaderboard', leaderBoardRouter);

export default router;
