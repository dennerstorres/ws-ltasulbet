import { Router } from 'express';
import userRoutes from './userRoutes';
import teamRoutes from './teamRoutes';

const router = Router();

// Prefixo para todas as rotas
const API_PREFIX = '/api';

// Rotas de usuários
router.use(`${API_PREFIX}/users`, userRoutes);

// Rotas de times
router.use(`${API_PREFIX}/teams`, teamRoutes);

export default router; 