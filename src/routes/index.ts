import { Router } from 'express';
import campaignRoutes from './campaign.routes';
import chapterRoutes from './chapter.routes';
import missionRoutes from './mission.routes';
import studentRoutes from './student.routes';

const router = Router();

router.use('/campaigns', campaignRoutes);        // /api/campaigns
router.use('/', chapterRoutes);                  // /api/campaigns/:id/chapters
router.use('/', missionRoutes);                  // /api/chapters/:id/missions, /api/missions/:id
router.use('/', studentRoutes);                  // /api/students, /api/students/progress

export default router;
