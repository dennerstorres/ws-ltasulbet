import { AppDataSource } from '../config/ormconfig';
import { Result } from '../entities/Result';

export class ResultModel {
  private static repository = AppDataSource.getRepository(Result);

  /**
   * Cria um novo resultado
   * @param resultData Dados do resultado
   * @returns Resultado criado
   */
  static async create(resultData: Partial<Result>): Promise<Result> {
    try {
      const result = this.repository.create({
        gameId: resultData.gameId,
        score1: resultData.score1,
        score2: resultData.score2
      });
      
      return await this.repository.save(result);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Busca todos os resultados
   * @returns Array de resultados
   */
  static async findAll(): Promise<Result[]> {
    return await this.repository.find({
      relations: ['game']
    });
  }

  /**
   * Busca um resultado por ID
   * @param id ID do resultado
   * @returns Resultado ou null se não encontrado
   */
  static async findById(id: number): Promise<Result | null> {
    return await this.repository.findOne({
      where: { id },
      relations: ['game']
    });
  }

  /**
   * Busca resultado por jogo
   * @param gameId ID do jogo
   * @returns Resultado ou null se não encontrado
   */
  static async findByGameId(gameId: number): Promise<Result | null> {
    return await this.repository.findOne({
      where: { gameId },
      relations: ['game']
    });
  }

  /**
   * Atualiza um resultado por ID
   * @param id ID do resultado
   * @param resultData Dados atualizados do resultado
   * @returns Resultado atualizado ou null se não encontrado
   */
  static async update(id: number, resultData: Partial<Result>): Promise<Result | null> {
    await this.repository.update(id, resultData);
    return await this.findById(id);
  }

  /**
   * Remove um resultado por ID
   * @param id ID do resultado
   * @returns Boolean indicando se o resultado foi removido
   */
  static async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }
} 