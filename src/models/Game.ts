import { AppDataSource } from '../config/ormconfig';
import { Game } from '../entities/Game';
import { Team } from '../entities/Team';

export class GameModel {
  private static repository = AppDataSource.getRepository(Game);
  private static teamRepository = AppDataSource.getRepository(Team);

  /**
   * Creates a new game
   * @param gameData Game data
   * @returns Created game
   */
  static async create(gameData: Partial<Game>): Promise<Game> {
    try {
      const team1 = await this.teamRepository.findOne({ where: { id: gameData.team1Id } });
      const team2 = await this.teamRepository.findOne({ where: { id: gameData.team2Id } });

      if (!team1 || !team2) {
        throw new Error('Team not found');
      }

      const game = this.repository.create({
        team1Id: gameData.team1Id,
        team2Id: gameData.team2Id,
        date: gameData.date,
        time: gameData.time,
        type: gameData.type,
        weekNumber: gameData.weekNumber,
        guessAllowed: gameData.guessAllowed,
        guessFinished: gameData.guessFinished
      });
      
      return await this.repository.save(game);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves all games
   * @returns Array of games
   */
  static async findAll(): Promise<Game[]> {
    return await this.repository.find({
      relations: ['team1', 'team2']
    });
  }

  /**
   * Retrieves a game by ID
   * @param id Game ID
   * @returns Game or null if not found
   */
  static async findById(id: number): Promise<Game | null> {
    return await this.repository.findOne({
      where: { id },
      relations: ['team1', 'team2']
    });
  }

  /**
   * Updates a game by ID
   * @param id Game ID
   * @param gameData Updated game data
   * @returns Updated game or null if not found
   */
  static async update(id: number, gameData: Partial<Game>): Promise<Game | null> {
    try {
      // Verifica se os times existem
      if (gameData.team1Id || gameData.team2Id) {
        const team1 = gameData.team1Id ? await this.teamRepository.findOne({ where: { id: gameData.team1Id } }) : null;
        const team2 = gameData.team2Id ? await this.teamRepository.findOne({ where: { id: gameData.team2Id } }) : null;

        if ((gameData.team1Id && !team1) || (gameData.team2Id && !team2)) {
          throw new Error('Team not found');
        }
      }

      await this.repository.update(id, gameData);
      return await this.findById(id);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Deletes a game by ID
   * @param id Game ID
   * @returns Boolean indicating if game was deleted
   */
  static async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }

  /**
   * Allows guesses for all games in a specific week
   * @param weekNumber Week number
   * @returns Number of games updated
   */
  static async allowGuessesByWeek(weekNumber: number): Promise<number> {
    const result = await this.repository.update(
      { weekNumber },
      { guessAllowed: true }
    );
    return result.affected || 0;
  }

  /**
   * Disallows guesses for all games in a specific week
   * @param weekNumber Week number
   * @returns Number of games updated
   */
  static async disallowGuessesByWeek(weekNumber: number): Promise<number> {
    const result = await this.repository.update(
      { weekNumber },
      { guessAllowed: false }
    );
    return result.affected || 0;
  }
} 