import prisma from '../config/db.js';

class SearchService {
  static async searchEntities({ userId, query, type, limit = 100 }) {
    const where = { userId };

    if (type) {
      where.type = type;
    }

    if (query) {
      where.OR = [
        { name: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } }
      ];
    }

    return prisma.entity.findMany({
      where,
      take: limit,
      orderBy: { createdAt: 'desc' }
    });
  }
}

export default SearchService;
