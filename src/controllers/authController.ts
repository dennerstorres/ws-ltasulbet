import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models/User';
import { AppError } from '../middlewares/errorHandler';

export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        throw new AppError('Username and password are required', 400);
      }

      const user = await UserModel.validatePassword(username, password);
      
      if (!user) {
        throw new AppError('Invalid username or password', 401);
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