import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models/User';
import { JWTService } from '../services/jwtService';
import { AppError } from '../middlewares/errorHandler';

export class AuthController {
  /**
   * Login de usuário
   * @param req Express request object
   * @param res Express response object
   * @param next Express next function
   */
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        throw new AppError('Usuário e senha são obrigatórios', 400);
      }

      const user = await UserModel.validatePassword(username, password);
      if (!user) {
        throw new AppError('Usuário ou senha inválidos', 401);
      }

      const token = JWTService.generateToken(user);

      res.status(200).json({
        status: 'success',
        data: {
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
          }
        }
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Verifica se o token é válido e retorna os dados do usuário
   * @param req Express request object
   * @param res Express response object
   * @param next Express next function
   */
  static async me(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserModel.findById(req.user.id);
      if (!user) {
        throw new AppError('Usuário não encontrado', 404);
      }

      res.status(200).json({
        status: 'success',
        data: {
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
          }
        }
      });
    } catch (error) {
      next(error);
    }
  }
} 