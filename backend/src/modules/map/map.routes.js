import { Router } from 'express';
import authMiddleware from '../../middleware/authMiddleware.js';
import MapController from './Map.controller.js';

const router = Router();

router.use(authMiddleware);

router.get('/', (req, res, next) => MapController.getGraph(req, res, next));

export default router;
