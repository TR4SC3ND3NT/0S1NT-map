import { Router } from 'express';
import authMiddleware from '../../middleware/authMiddleware.js';
import LinkController from './Link.controller.js';

const router = Router();

router.use(authMiddleware);

router.get('/', (req, res, next) => LinkController.listAll(req, res, next));
router.post('/', (req, res, next) => LinkController.create(req, res, next));
router.get('/entity/:entityId', (req, res, next) =>
  LinkController.listByEntity(req, res, next)
);
router.delete('/:id', (req, res, next) =>
  LinkController.remove(req, res, next)
);

export default router;
