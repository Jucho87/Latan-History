import { Request, Response, NextFunction } from 'express';
import { MissionService } from '../services/mission.service';
import { success, error } from '../utils/response';

export class MissionController {
  static async getByChapter(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return error(res, 'Invalid chapter id', 400);
      }
      const missions = await MissionService.getByChapter(id);
      return success(res, { missions });
    } catch (err) {
      next(err);
    }
  }

  static async getDetail(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      if (isNaN(id)) {
        return error(res, 'Invalid mission id', 400);
      }
      const mission = await MissionService.getDetail(id);
      if (!mission) {
        return error(res, 'Mission not found', 404);
      }
      return success(res, { mission });
    } catch (err) {
      next(err);
    }
  }
}
