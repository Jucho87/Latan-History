import { Router } from 'express';
import { MissionController } from '../controllers/mission.controller';

const router = Router();

router.get('/chapters/:id/missions', MissionController.getByChapter);
router.get('/missions/:id', MissionController.getDetail);

export default router;
