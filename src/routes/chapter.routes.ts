import { Router } from 'express';
import { ChapterController } from '../controllers/chapter.controller';

const router = Router();

router.get('/campaigns/:id/chapters', ChapterController.getByCampaign);

export default router;
