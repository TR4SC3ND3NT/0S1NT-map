import NoteModel from './Note.model.js';
import EntityModel from '../entities/Entity.model.js';
import {
  createError,
  validateNoteInput
} from '../../utils/validators.js';

class NoteService {
  static async create(userId, payload) {
    validateNoteInput(payload);

    const entity = await EntityModel.findById(payload.entityId, userId);
    if (!entity) {
      throw createError(404, 'Entity not found');
    }

    const note = await NoteModel.create({
      userId,
      entityId: payload.entityId,
      content: payload.content
    });

    return note;
  }

  static async listForEntity(userId, entityId) {
    const entity = await EntityModel.findById(entityId, userId);
    if (!entity) {
      throw createError(404, 'Entity not found');
    }
    return NoteModel.findByEntity(userId, entityId);
  }

  static async update(userId, id, { content }) {
    if (!content || typeof content !== 'string') {
      throw createError(400, 'Content is required');
    }
    const note = await NoteModel.findById(id);
    if (!note || note.userId !== userId) {
      throw createError(404, 'Note not found');
    }
    const updated = await NoteModel.updateById(id, { content });
    return updated;
  }

  static async remove(userId, id) {
    const note = await NoteModel.findById(id);
    if (!note || note.userId !== userId) {
      throw createError(404, 'Note not found');
    }
    await NoteModel.deleteById(id);
  }
}

export default NoteService;
