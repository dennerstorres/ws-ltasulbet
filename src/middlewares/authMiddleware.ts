import { Request, Response, NextFunction } from 'express';
import { JWTService } from '../services/jwtService';
import { AppError } from './errorHandler';
import { UserModel } from '../models/User';

// Estende o tipo Request do Express para incluir o usuário
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

/**
 * Middleware para verificar se o usuário está autenticado
 */
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = JWTService.extractTokenFromHeader(req.headers.authorization);
    
    if (!token) {
      throw new AppError('Token não fornecido', 401);
    }

    const decoded = JWTService.verifyToken(token);
    if (!decoded) {
      throw new AppError('Token inválido', 401);
    }

    // Verifica se o usuário ainda existe
    const user = await UserModel.findById(decoded.id);
    if (!user) {
      throw new AppError('Usuário não encontrado', 401);
    }

    // Adiciona o usuário à requisição
    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Middleware para verificar se o usuário é admin
 */
export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user?.isAdmin) {
    throw new AppError('Acesso não autorizado', 403);
  }
  next();
}; 