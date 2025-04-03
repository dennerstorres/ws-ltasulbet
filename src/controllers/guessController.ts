import { Request, Response, NextFunction } from 'express';
import { GuessModel } from '../models/Guess';
import { AppError } from '../middlewares/errorHandler';

export class GuessController {
  /**
   * Cria um novo palpite
   * @param req Express request object contendo dados do palpite
   * @param res Express response object
   * @param next Express next function
   */
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const guess = await GuessModel.create(req.body);
      res.status(201).json({
        status: 'success',
        data: guess
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Busca todos os palpites
   * @param req Express request object
   * @param res Express response object
   * @param next Express next function
   */
  static async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const guesses = await GuessModel.findAll();
      console.log('guesses', guesses);
      res.status(200).json({
        status: 'success',
        data: guesses
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Busca um palpite por ID
   * @param req Express request object contendo ID do palpite nos parâmetros
   * @param res Express response object
   * @param next Express next function
   */
  static async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const guess = await GuessModel.findById(parseInt(req.params.id));
      if (!guess) {
        throw new AppError('Palpite não encontrado', 404);
      }
      res.status(200).json({
        status: 'success',
        data: guess
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Busca palpites por usuário
   * @param req Express request object contendo ID do usuário nos parâmetros
   * @param res Express response object
   * @param next Express next function
   */
  static async findByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const guesses = await GuessModel.findByUserId(parseInt(req.params.userId));
      console.log('guesses', guesses);
      res.status(200).json({
        status: 'success',
        data: guesses
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Busca palpites por jogo
   * @param req Express request object contendo ID do jogo nos parâmetros
   * @param res Express response object
   * @param next Express next function
   */
  static async findByGameId(req: Request, res: Response, next: NextFunction) {
    try {
      const guesses = await GuessModel.findByGameId(parseInt(req.params.gameId));
      res.status(200).json({
        status: 'success',
        data: guesses
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Atualiza um palpite por ID
   * @param req Express request object contendo ID do palpite nos parâmetros e dados de atualização no body
   * @param res Express response object
   * @param next Express next function
   */
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const guess = await GuessModel.update(parseInt(req.params.id), req.body);
      if (!guess) {
        throw new AppError('Palpite não encontrado', 404);
      }
      res.status(200).json({
        status: 'success',
        data: guess
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Remove um palpite por ID
   * @param req Express request object contendo ID do palpite nos parâmetros
   * @param res Express response object
   * @param next Express next function
   */
  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const deleted = await GuessModel.delete(parseInt(req.params.id));
      if (!deleted) {
        throw new AppError('Palpite não encontrado', 404);
      }
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  /**
   * Atualiza os pontos de um palpite
   * @param req Express request object contendo ID do palpite nos parâmetros e pontos no body
   * @param res Express response object
   * @param next Express next function
   */
  static async updatePoints(req: Request, res: Response, next: NextFunction) {
    try {
      const guess = await GuessModel.updatePoints(parseInt(req.params.id), req.body.points);
      if (!guess) {
        throw new AppError('Palpite não encontrado', 404);
      }
      res.status(200).json({
        status: 'success',
        data: guess
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Marca um palpite como finalizado
   * @param req Express request object contendo ID do palpite nos parâmetros
   * @param res Express response object
   * @param next Express next function
   */
  static async finish(req: Request, res: Response, next: NextFunction) {
    try {
      const guess = await GuessModel.finish(parseInt(req.params.id));
      if (!guess) {
        throw new AppError('Palpite não encontrado', 404);
      }
      res.status(200).json({
        status: 'success',
        data: guess
      });
    } catch (error) {
      next(error);
    }
  }
} 