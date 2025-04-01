import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models/User';
import { AppError } from '../middlewares/errorHandler';

export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        throw new AppError('Email and password are required', 400);
      }

      const user = await UserModel.validatePassword(email, senha);
      
      if (!user) {
        throw new AppError('Invalid email or password', 401);
      }

      res.status(200).json({
        status: 'success',
        data: user
      });
    } catch (error) {
      next(error);
    }
  }
} 