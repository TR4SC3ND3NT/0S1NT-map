import prisma from '../../config/db.js';

class NoteModel {
  static async create(data) {
    return prisma.note.create({ data });
  }

  static async findById(id) {
    return prisma.note.findUnique({
      where: { id }
    });
  }

  static async findByEntity(userId, entityId) {
    return prisma.note.findMany({
      where: { userId, entityId },
      orderBy: { createdAt: 'desc' }
    });
  }

  static async updateById(id, data) {
    return prisma.note.update({
      where: { id },
      data
    });
  }

  static async deleteById(id) {
    return prisma.note.delete({
      where: { id }
    });
  }
}

export default NoteModel;
