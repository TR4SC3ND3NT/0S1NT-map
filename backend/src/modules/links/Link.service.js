import LinkModel from './Link.model.js';
import EntityModel from '../entities/Entity.model.js';
import {
  createError,
  validateLinkInput
} from '../../utils/validators.js';

class LinkService {
  static async create(userId, payload) {
    validateLinkInput(payload);

    const [source, target] = await Promise.all([
      EntityModel.findById(payload.sourceId, userId),
      EntityModel.findById(payload.targetId, userId)
    ]);

    if (!source || !target) {
      throw createError(404, 'Source or target entity not found');
    }

    const existing = await LinkModel.existsBetween(
      userId,
      payload.sourceId,
      payload.targetId,
      payload.type
    );

    if (existing) {
      throw createError(409, 'Link already exists');
    }

    const link = await LinkModel.create({
      userId,
      type: payload.type,
      description: payload.description || null,
      sourceId: payload.sourceId,
      targetId: payload.targetId
    });

    return link;
  }

  static async remove(userId, id) {
    const link = await LinkModel.findById(id);
    if (!link || link.userId !== userId) {
      throw createError(404, 'Link not found');
    }
    await LinkModel.deleteById(id);
  }

  static async listByEntity(userId, entityId) {
    const entity = await EntityModel.findById(entityId, userId);
    if (!entity) {
      throw createError(404, 'Entity not found');
    }
    return LinkModel.findByEntity(userId, entityId);
  }

  static async listAll(userId) {
    return LinkModel.findByUser(userId);
  }
}

export default LinkService;
