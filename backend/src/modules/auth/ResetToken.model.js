import prisma from '../../config/db.js';

class ResetTokenModel {
  static async createToken({ userId, token, expiresAt }) {
    return prisma.resetToken.create({
      data: {
        userId,
        token,
        expiresAt
      }
    });
  }

  static async findValidToken(token) {
    const now = new Date();
    return prisma.resetToken.findFirst({
      where: {
        token,
        expiresAt: { gt: now }
      },
      include: {
        user: true
      }
    });
  }

  static async deleteById(id) {
    return prisma.resetToken.delete({
      where: { id }
    });
  }

  static async deleteByUserId(userId) {
    return prisma.resetToken.deleteMany({
      where: { userId }
    });
  }
}

export default ResetTokenModel;
