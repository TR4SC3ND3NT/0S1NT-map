import BaseController from '../../controllers/BaseController.js';
import LinkService from './Link.service.js';

class LinkController extends BaseController {
  async create(req, res, next) {
    try {
      const link = await LinkService.create(req.user.id, req.body);
      return this.created(res, link);
    } catch (e) {
      next(e);
    }
  }

  async remove(req, res, next) {
    try {
      // ВАЖНО: Преобразуем ID
      const id = Number(req.params.id);
      await LinkService.remove(req.user.id, id);
      return this.noContent(res);
    } catch (e) {
      next(e);
    }
  }

  async listByEntity(req, res, next) {
    try {
      // ВАЖНО: Преобразуем entityId
      const entityId = Number(req.params.entityId);
      const links = await LinkService.listByEntity(
        req.user.id,
        entityId
      );
      return this.success(res, links);
    } catch (e) {
      next(e);
    }
  }

  async listAll(req, res, next) {
    try {
      const links = await LinkService.listAll(req.user.id);
      return this.success(res, links);
    } catch (e) {
      next(e);
    }
  }
}

export default new LinkController();