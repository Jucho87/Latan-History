import { Request, Response, NextFunction } from 'express';
import { ChapterService } from '../services/chapter.service';
import { success, error } from '../utils/response';

export class ChapterController {
  static async getByCampaign(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return error(res, 'Invalid campaign id', 400);
      }
      const chapters = await ChapterService.getByCampaign(id);
      return success(res, { chapters });
    } catch (err) {
      next(err);
    }
  }
}
