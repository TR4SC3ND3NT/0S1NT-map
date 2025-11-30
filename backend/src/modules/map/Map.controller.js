import BaseController from '../../controllers/BaseController.js';
import MapService from './Map.service.js';

class MapController extends BaseController {
  async getGraph(req, res, next) {
    try {
      const graph = await MapService.getUserGraph(req.user.id);
      return this.success(res, graph);
    } catch (e) {
      next(e);
    }
  }
}

export default new MapController();
