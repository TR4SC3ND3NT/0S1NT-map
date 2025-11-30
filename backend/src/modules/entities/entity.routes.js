import { Router } from 'express';
import authMiddleware from '../../middleware/authMiddleware.js';
import EntityController from './Entity.controller.js';

const router = Router();

router.use(authMiddleware);

router.get('/', (req, res, next) => EntityController.list(req, res, next));
router.post('/', (req, res, next) => EntityController.create(req, res, next));
router.get('/:id', (req, res, next) => EntityController.get(req, res, next));
router.put('/:id', (req, res, next) => EntityController.update(req, res, next));
router.delete('/:id', (req, res, next) =>
  EntityController.remove(req, res, next)
);
router.patch('/:id/position', (req, res, next) =>
  EntityController.updatePosition(req, res, next)
);

export default router;
