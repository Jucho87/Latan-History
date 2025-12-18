import { prisma } from '../config/database';

export class MissionService {
  static async getByChapter(chapterId: number) {
    return prisma.mission.findMany({
      where: { chapterId },
      orderBy: { orderIndex: 'asc' },
    });
  }

  static async getDetail(id: number) {
    return prisma.mission.findUnique({
      where: { id },
      include: {
        questions: {
          orderBy: { orderIndex: 'asc' },
          include: {
            options: {
              orderBy: { orderIndex: 'asc' },
            },
          },
        },
      },
    });
  }
}
