import prisma from '../../config/db.js';

class LinkModel {
  static async create(data) {
    return prisma.link.create({ data });
  }

  static async findById(id) {
    return prisma.link.findUnique({
      where: { id }
    });
  }

  static async findByUser(userId) {
    return prisma.link.findMany({
      where: { userId }
    });
  }

  static async findByEntity(userId, entityId) {
    return prisma.link.findMany({
      where: {
        userId,
        OR: [{ sourceId: entityId }, { targetId: entityId }]
      }
    });
  }

  static async deleteById(id) {
    return prisma.link.delete({
      where: { id }
    });
  }

  static async existsBetween(userId, sourceId, targetId, type) {
    return prisma.link.findFirst({
      where: { userId, sourceId, targetId, type }
    });
  }
}

export default LinkModel;
