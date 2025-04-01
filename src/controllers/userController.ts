import { Request, Response, NextFunction } from 'express';
import { UserModel, User } from '../models/User';
import { AppError } from '../middlewares/errorHandler';

export class UserController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserModel.create(req.body);
      res.status(201).json({
        status: 'success',
        data: user
      });
    } catch (error) {
      next(error);
    }
  }

  static async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserModel.findAll();
      res.status(200).json({
        status: 'success',
        data: users
      });
    } catch (error) {
      next(error);
    }
  }

  static async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserModel.findById(parseInt(req.params.id));
      if (!user) {
        throw new AppError('User not found', 404);
      }
      res.status(200).json({
        status: 'success',
        data: user
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserModel.update(parseInt(req.params.id), req.body);
      if (!user) {
        throw new AppError('User not found', 404);
      }
      res.status(200).json({
        status: 'success',
        data: user
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const deleted = await UserModel.delete(parseInt(req.params.id));
      if (!deleted) {
        throw new AppError('User not found', 404);
      }
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
} 