import prisma from '../../config/db.js';

class MapService {
  static async getUserGraph(userId) {
    const [entities, links, notes] = await Promise.all([
      prisma.entity.findMany({
        where: { userId },
        orderBy: { createdAt: 'asc' }
      }),
      prisma.link.findMany({
        where: { userId },
        orderBy: { createdAt: 'asc' }
      }),
      prisma.note.findMany({
        where: { userId },
        orderBy: { createdAt: 'asc' }
      })
    ]);

    return { entities, links, notes };
  }
}

export default MapService;
