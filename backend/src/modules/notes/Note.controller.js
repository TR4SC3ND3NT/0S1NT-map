import BaseController from '../../controllers/BaseController.js';
import NoteService from './Note.service.js';

class NoteController extends BaseController {
  async create(req, res, next) {
    try {
      const note = await NoteService.create(req.user.id, req.body);
      return this.created(res, note);
    } catch (e) {
      next(e);
    }
  }

  async listForEntity(req, res, next) {
    try {
      const entityId = Number(req.params.entityId);
      const notes = await NoteService.listForEntity(req.user.id, entityId);
      return this.success(res, notes);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const id = Number(req.params.id);
      const note = await NoteService.update(req.user.id, id, req.body);
      return this.success(res, note);
    } catch (e) {
      next(e);
    }
  }

  async remove(req, res, next) {
    try {
      const id = Number(req.params.id);
      await NoteService.remove(req.user.id, id);
      return this.noContent(res);
    } catch (e) {
      next(e);
    }
  }
}

export default new NoteController();