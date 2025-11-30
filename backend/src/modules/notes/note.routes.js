import { Router } from 'express';
import authMiddleware from '../../middleware/authMiddleware.js';
import NoteController from './Note.controller.js';

const router = Router();

router.use(authMiddleware);

router.post('/', (req, res, next) => NoteController.create(req, res, next));
router.get('/entity/:entityId', (req, res, next) =>
  NoteController.listForEntity(req, res, next)
);
router.put('/:id', (req, res, next) =>
  NoteController.update(req, res, next)
);
router.delete('/:id', (req, res, next) =>
  NoteController.remove(req, res, next)
);

export default router;
