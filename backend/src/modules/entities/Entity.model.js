import prisma from '../../config/db.js';

class EntityModel {
  static async create(data) {
    return prisma.entity.create({ data });
  }

  static async findById(id, userId) {
    return prisma.entity.findFirst({
      where: { id, userId }
    });
  }

  static async findAllByUser(userId, { type, search } = {}) {
    const where = { userId };

    if (type) {
      where.type = type;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    return prisma.entity.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
  }

  static async updateById(id, data) {
    return prisma.entity.update({
      where: { id },
      data
    });
  }

  static async deleteById(id) {
    return prisma.entity.delete({
      where: { id }
    });
  }

  static async updatePosition(id, x, y) {
    return prisma.entity.update({
      where: { id },
      data: { x, y }
    });
  }
}

export default EntityModel;
