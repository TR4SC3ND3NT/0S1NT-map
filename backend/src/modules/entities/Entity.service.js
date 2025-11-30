import EntityModel from './Entity.model.js';
import SearchService from '../../services/SearchService.js';
import {
  createError,
  validateEntityInput
} from '../../utils/validators.js';

class EntityService {
  static async list(userId, { search, type } = {}) {
    return SearchService.searchEntities({ userId, query: search, type });
  }

  static async getById(userId, id) {
    const entity = await EntityModel.findById(id, userId);
    if (!entity) {
      throw createError(404, 'Entity not found');
    }
    return entity;
  }

  static async create(userId, payload) {
    validateEntityInput(payload);
    const entity = await EntityModel.create({
      userId,
      type: payload.type,
      name: payload.name,
      description: payload.description || null,
      data: payload.data || null,
      x: payload.x ?? 0,
      y: payload.y ?? 0
    });
    return entity;
  }

  static async update(userId, id, payload) {
    validateEntityInput(payload);
    const existing = await EntityModel.findById(id, userId);
    if (!existing) {
      throw createError(404, 'Entity not found');
    }
    const updated = await EntityModel.updateById(id, {
      type: payload.type,
      name: payload.name,
      description: payload.description ?? null,
      data: payload.data ?? existing.data
    });
    return updated;
  }

  static async remove(userId, id) {
    const existing = await EntityModel.findById(id, userId);
    if (!existing) {
      throw createError(404, 'Entity not found');
    }
    await EntityModel.deleteById(id);
  }

  static async updatePosition(userId, id, { x, y }) {
    if (typeof x !== 'number' || typeof y !== 'number') {
      throw createError(400, 'Invalid coordinates');
    }
    const existing = await EntityModel.findById(id, userId);
    if (!existing) {
      throw createError(404, 'Entity not found');
    }
    const updated = await EntityModel.updatePosition(id, x, y);
    return updated;
  }
}

export default EntityService;
