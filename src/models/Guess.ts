import { AppDataSource } from '../config/ormconfig';
import { Guess } from '../entities/Guess';

export class GuessModel {
  private static repository = AppDataSource.getRepository(Guess);

  /**
   * Cria um novo palpite
   * @param guessData Dados do palpite
   * @returns Palpite criado
   */
  static async create(guessData: Partial<Guess>): Promise<Guess> {
    try {
      const guess = this.repository.create({
        gameId: guessData.gameId,
        userId: guessData.userId,
        team1Id: guessData.team1Id,
        team2Id: guessData.team2Id,
        score1: guessData.score1,
        score2: guessData.score2,
        date: guessData.date,
        type: guessData.type,
        points: guessData.points || 0,
        finished: guessData.finished || false
      });
      
      return await this.repository.save(guess);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Busca todos os palpites
   * @returns Array de palpites
   */
  static async findAll(): Promise<Guess[]> {
    return await this.repository.find({
      relations: ['user', 'game', 'team1', 'team2']
    });
  }

  /**
   * Busca um palpite por ID
   * @param id ID do palpite
   * @returns Palpite ou null se não encontrado
   */
  static async findById(id: number): Promise<Guess | null> {
    return await this.repository.findOne({
      where: { id },
      relations: ['user', 'game', 'team1', 'team2']
    });
  }

  /**
   * Busca palpites por usuário
   * @param userId ID do usuário
   * @returns Array de palpites do usuário
   */
  static async findByUserId(userId: number): Promise<Guess[]> {
    return await this.repository.find({
      where: { userId },
      relations: ['user', 'game', 'team1', 'team2']
    });
  }

  /**
   * Busca palpites por jogo
   * @param gameId ID do jogo
   * @returns Array de palpites do jogo
   */
  static async findByGameId(gameId: number): Promise<Guess[]> {
    return await this.repository.find({
      where: { gameId },
      relations: ['user', 'game', 'team1', 'team2']
    });
  }

  /**
   * Atualiza um palpite por ID
   * @param id ID do palpite
   * @param guessData Dados atualizados do palpite
   * @returns Palpite atualizado ou null se não encontrado
   */
  static async update(id: number, guessData: Partial<Guess>): Promise<Guess | null> {
    await this.repository.update(id, guessData);
    return await this.findById(id);
  }

  /**
   * Remove um palpite por ID
   * @param id ID do palpite
   * @returns Boolean indicando se o palpite foi removido
   */
  static async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }

  /**
   * Atualiza os pontos de um palpite
   * @param id ID do palpite
   * @param points Novos pontos
   * @returns Palpite atualizado ou null se não encontrado
   */
  static async updatePoints(id: number, points: number): Promise<Guess | null> {
    await this.repository.update(id, { points });
    return await this.findById(id);
  }

  /**
   * Marca um palpite como finalizado
   * @param id ID do palpite
   * @returns Palpite atualizado ou null se não encontrado
   */
  static async finish(id: number): Promise<Guess | null> {
    await this.repository.update(id, { finished: true });
    return await this.findById(id);
  }


  /**
   * Marca um palpite como não finalizado
   * @param id ID do palpite
   * @returns Palpite atualizado ou null se não encontrado
   */
  static async unfinish(id: number): Promise<Guess | null> {
    await this.repository.update(id, { finished: false });
    return await this.findById(id);
  }
} 