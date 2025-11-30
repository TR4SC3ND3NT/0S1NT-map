import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes.js';
import entityRoutes from '../modules/entities/entity.routes.js';
import linkRoutes from '../modules/links/link.routes.js';
import noteRoutes from '../modules/notes/note.routes.js';
import mapRoutes from '../modules/map/map.routes.js';
import healthRoutes from './health.routes.js';

const router = Router();

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/entities', entityRoutes);
router.use('/links', linkRoutes);
router.use('/notes', noteRoutes);
router.use('/map', mapRoutes);

export default router;
