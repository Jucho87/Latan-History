import { prisma } from '../config/database';

export class StudentService {
  static async createOrGetByEmail(name: string, email?: string | null) {
    if (email) {
      const existing = await prisma.student.findUnique({ where: { email } });
      if (existing) return existing;
    }
    return prisma.student.create({ data: { name, email: email || null } });
  }

  static async saveProgress(params: {
    studentId: number;
    missionId: number;
    score: number;
    correctAnswers: number;
    totalQuestions: number;
    timeSpent: number;
  }) {
    const { studentId, missionId, score, correctAnswers, totalQuestions, timeSpent } = params;
    const completed = true;
    const completedAt = new Date();

    return prisma.studentProgress.upsert({
      where: {
        studentId_missionId: { studentId, missionId },
      },
      create: {
        studentId,
        missionId,
        score,
        correctAnswers,
        totalQuestions,
        timeSpent,
        completed,
        completedAt,
      },
      update: {
        score,
        correctAnswers,
        totalQuestions,
        timeSpent,
        completed,
        completedAt,
      },
    });
  }
}
