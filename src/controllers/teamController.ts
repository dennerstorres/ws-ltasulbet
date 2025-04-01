import { Request, Response, NextFunction } from 'express';
import { TeamModel } from '../models/Team';
import { AppError } from '../middlewares/errorHandler';

export class TeamController {
  /**
   * Creates a new team
   * @param req Express request object containing team data
   * @param res Express response object
   * @param next Express next function
   */
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const team = await TeamModel.create(req.body);
      res.status(201).json({
        status: 'success',
        data: team
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieves all teams
   * @param req Express request object
   * @param res Express response object
   * @param next Express next function
   */
  static async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const teams = await TeamModel.findAll();
      res.status(200).json({
        status: 'success',
        data: teams
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieves a team by ID
   * @param req Express request object containing team ID in params
   * @param res Express response object
   * @param next Express next function
   */
  static async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const team = await TeamModel.findById(parseInt(req.params.id));
      if (!team) {
        throw new AppError('Team not found', 404);
      }
      res.status(200).json({
        status: 'success',
        data: team
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Updates a team by ID
   * @param req Express request object containing team ID in params and update data in body
   * @param res Express response object
   * @param next Express next function
   */
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const team = await TeamModel.update(parseInt(req.params.id), req.body);
      if (!team) {
        throw new AppError('Team not found', 404);
      }
      res.status(200).json({
        status: 'success',
        data: team
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Removes a team by ID
   * @param req Express request object containing team ID in params
   * @param res Express response object
   * @param next Express next function
   */
  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const deleted = await TeamModel.delete(parseInt(req.params.id));
      if (!deleted) {
        throw new AppError('Team not found', 404);
      }
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  /**
   * Updates team points
   * @param req Express request object containing team ID in params and points in body
   * @param res Express response object
   * @param next Express next function
   */
  static async updatePoints(req: Request, res: Response, next: NextFunction) {
    try {
      const team = await TeamModel.updatePoints(parseInt(req.params.id), req.body.points);
      if (!team) {
        throw new AppError('Team not found', 404);
      }
      res.status(200).json({
        status: 'success',
        data: team
      });
    } catch (error) {
      next(error);
    }
  }
} 