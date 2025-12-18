import { Request, Response, NextFunction } from 'express';
import { StudentService } from '../services/student.service';
import { success, error } from '../utils/response';

export class StudentController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email } = req.body;
      if (!name || typeof name !== 'string') {
        return error(res, 'Name is required', 400);
      }
      const student = await StudentService.createOrGetByEmail(name, email);
      return success(res, { student }, 201);
    } catch (err) {
      next(err);
    }
  }

  static async saveProgress(req: Request, res: Response, next: NextFunction) {
    try {
      const { studentId, missionId, score, correctAnswers, totalQuestions, timeSpent } = req.body;

      if (!studentId || !missionId) {
        return error(res, 'studentId and missionId are required', 400);
      }

      const progress = await StudentService.saveProgress({
        studentId: Number(studentId),
        missionId: Number(missionId),
        score: Number(score || 0),
        correctAnswers: Number(correctAnswers || 0),
        totalQuestions: Number(totalQuestions || 0),
        timeSpent: Number(timeSpent || 0),
      });

      return success(res, { progress }, 201);
    } catch (err) {
      next(err);
    }
  }
}
