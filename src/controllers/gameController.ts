import { Request, Response, NextFunction } from 'express';
import { GameModel } from '../models/Game';
import { AppError } from '../middlewares/errorHandler';

export class GameController {
  /**
   * Creates a new game
   * @param req Express request object containing game data
   * @param res Express response object
   * @param next Express next function
   */
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const game = await GameModel.create(req.body);
      res.status(201).json({
        status: 'success',
        data: game
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieves all games
   * @param req Express request object
   * @param res Express response object
   * @param next Express next function
   */
  static async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const games = await GameModel.findAll();
      res.status(200).json({
        status: 'success',
        data: games
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Retrieves a game by ID
   * @param req Express request object containing game ID in params
   * @param res Express response object
   * @param next Express next function
   */
  static async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const game = await GameModel.findById(parseInt(req.params.id));
      if (!game) {
        throw new AppError('Game not found', 404);
      }
      res.status(200).json({
        status: 'success',
        data: game
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Updates a game by ID
   * @param req Express request object containing game ID in params and update data in body
   * @param res Express response object
   * @param next Express next function
   */
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const game = await GameModel.update(parseInt(req.params.id), req.body);
      if (!game) {
        throw new AppError('Game not found', 404);
      }
      res.status(200).json({
        status: 'success',
        data: game
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Removes a game by ID
   * @param req Express request object containing game ID in params
   * @param res Express response object
   * @param next Express next function
   */
  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const deleted = await GameModel.delete(parseInt(req.params.id));
      if (!deleted) {
        throw new AppError('Game not found', 404);
      }
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
} 