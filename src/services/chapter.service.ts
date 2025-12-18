import { prisma } from '../config/database';

export class ChapterService {
  static async getByCampaign(campaignId: number) {
    return prisma.chapter.findMany({
      where: { campaignId },
      orderBy: { orderIndex: 'asc' },
    });
  }
}
