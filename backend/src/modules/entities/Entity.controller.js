import BaseController from '../../controllers/BaseController.js';
import EntityService from './Entity.service.js';

class EntityController extends BaseController {
  async list(req, res, next) {
    try {
      const { search, type } = req.query;
      const entities = await EntityService.list(req.user.id, {
        search,
        type
      });
      return this.success(res, entities);
    } catch (e) {
      next(e);
    }
  }

  async get(req, res, next) {
    try {
      // ВАЖНО: Преобразуем строку в число
      const id = Number(req.params.id);
      const entity = await EntityService.getById(req.user.id, id);
      return this.success(res, entity);
    } catch (e) {
      next(e);
    }
  }

  async create(req, res, next) {
    try {
      const entity = await EntityService.create(req.user.id, req.body);
      return this.created(res, entity);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      // ВАЖНО: Преобразуем строку в число
      const id = Number(req.params.id);
      const entity = await EntityService.update(
        req.user.id,
        id,
        req.body
      );
      return this.success(res, entity);
    } catch (e) {
      next(e);
    }
  }

  async remove(req, res, next) {
    try {
      // ВАЖНО: Преобразуем строку в число
      const id = Number(req.params.id);
      await EntityService.remove(req.user.id, id);
      return this.noContent(res);
    } catch (e) {
      next(e);
    }
  }

  async updatePosition(req, res, next) {
    try {
      // ВАЖНО: Преобразуем строку в число
      const id = Number(req.params.id);
      const entity = await EntityService.updatePosition(
        req.user.id,
        id,
        req.body
      );
      return this.success(res, entity);
    } catch (e) {
      next(e);
    }
  }
}

export default new EntityController();