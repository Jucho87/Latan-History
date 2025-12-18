import { Request, Response, NextFunction } from 'express';
import { CampaignService } from '../services/campaign.service';
import { success } from '../utils/response';

export class CampaignController {
  static async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const campaigns = await CampaignService.getAll();
      return success(res, { campaigns });
    } catch (err) {
      next(err);
    }
  }
}
