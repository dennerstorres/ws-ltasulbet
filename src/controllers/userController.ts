import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models/User';
import { AppError } from '../middlewares/errorHandler';

export class UserController {
  /**
   * Creates a new user
   * @param req Express request object containing user data
   * @param res Express response object
   * @param next Express next function
   */
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

  /**
   * Retrieves all users
   * @param req Express request object
   * @param res Express response object
   * @param next Express next function
   */
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

  /**
   * Retrieves a user by ID
   * @param req Express request object containing user ID in params
   * @param res Express response object
   * @param next Express next function
   */
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

  /**
   * Updates a user by ID
   * @param req Express request object containing user ID in params and update data in body
   * @param res Express response object
   * @param next Express next function
   */
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

  /**
   * Removes a user by ID
   * @param req Express request object containing user ID in params
   * @param res Express response object
   * @param next Express next function
   */
  static async remove(req: Request, res: Response, next: NextFunction) {
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

  /**
   * Updates the user's password
   * @param req Express request object containing user ID in params and passwords in body
   * @param res Express response object
   * @param next Express next function
   */
  static async updatePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { currentPassword, newPassword } = req.body;
      
      if (!currentPassword || !newPassword) {
        throw new AppError('Current password and new password are required', 400);
      }

      await UserModel.updatePassword(parseInt(req.params.id), currentPassword, newPassword);
      
      res.status(200).json({
        status: 'success',
        message: 'Password updated successfully'
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'User not found') {
          next(new AppError('User not found', 404));
        } else if (error.message === 'Current password is incorrect') {
          next(new AppError('Current password is incorrect', 401));
        } else {
          next(error);
        }
      } else {
        next(error);
      }
    }
  }
} 