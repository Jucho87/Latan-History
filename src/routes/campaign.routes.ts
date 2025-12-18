import { Router } from 'express';
import { CampaignController } from '../controllers/campaign.controller';

const router = Router();

router.get('/', CampaignController.getAll);

export default router;
