import prisma from '../../config/db.js';

class UserModel {
  static async createUser({ email, password, name }) {
    return prisma.user.create({
      data: {
        email,
        password,
        name: name || null
      }
    });
  }

  static async findByEmail(email) {
    return prisma.user.findUnique({
      where: { email }
    });
  }

  static async findById(id) {
    return prisma.user.findUnique({
      where: { id }
    });
  }

  static async updatePassword(id, password) {
    return prisma.user.update({
      where: { id },
      data: { password }
    });
  }

  static toSafeUser(user) {
    if (!user) return null;
    const { password, ...rest } = user;
    return rest;
  }
}

export default UserModel;
