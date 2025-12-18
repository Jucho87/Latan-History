import { prisma } from '../config/database';

export class CampaignService {
  static async getAll() {
    return prisma.campaign.findMany({
      orderBy: { name: 'asc' },
    });
  }

  static async getById(id: number) {
    return prisma.campaign.findUnique({ where: { id } });
  }
}
