import { Request, Response, NextFunction } from 'express';
import { ResultModel } from '../models/Result';
import { AppError } from '../middlewares/errorHandler';

export class ResultController {
  /**
   * Cria um novo resultado
   * @param req Express request object contendo dados do resultado
   * @param res Express response object
   * @param next Express next function
   */
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await ResultModel.create(req.body);
      res.status(201).json({
        status: 'success',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Busca todos os resultados
   * @param req Express request object
   * @param res Express response object
   * @param next Express next function
   */
  static async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const results = await ResultModel.findAll();
      res.status(200).json({
        status: 'success',
        data: results
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Busca um resultado por ID
   * @param req Express request object contendo ID do resultado nos parâmetros
   * @param res Express response object
   * @param next Express next function
   */
  static async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await ResultModel.findById(parseInt(req.params.id));
      if (!result) {
        throw new AppError('Resultado não encontrado', 404);
      }
      res.status(200).json({
        status: 'success',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Busca resultado por jogo
   * @param req Express request object contendo ID do jogo nos parâmetros
   * @param res Express response object
   * @param next Express next function
   */
  static async findByGameId(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await ResultModel.findByGameId(parseInt(req.params.gameId));
      if (!result) {
        throw new AppError('Resultado não encontrado', 404);
      }
      res.status(200).json({
        status: 'success',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Atualiza um resultado por ID
   * @param req Express request object contendo ID do resultado nos parâmetros e dados de atualização no body
   * @param res Express response object
   * @param next Express next function
   */
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await ResultModel.update(parseInt(req.params.id), req.body);
      if (!result) {
        throw new AppError('Resultado não encontrado', 404);
      }
      res.status(200).json({
        status: 'success',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Remove um resultado por ID
   * @param req Express request object contendo ID do resultado nos parâmetros
   * @param res Express response object
   * @param next Express next function
   */
  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const deleted = await ResultModel.delete(parseInt(req.params.id));
      if (!deleted) {
        throw new AppError('Resultado não encontrado', 404);
      }
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
} 