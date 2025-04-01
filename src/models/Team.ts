import { AppDataSource } from '../config/ormconfig';
import { Team } from '../entities/Team';

export class TeamModel {
  private static repository = AppDataSource.getRepository(Team);

  /**
   * Creates a new team
   * @param teamData Team data
   * @returns Created team
   */
  static async create(teamData: Partial<Team>): Promise<Team> {
    try {
      const team = this.repository.create({
        name: teamData.name,
        logo: teamData.logo || null,
        points: teamData.points || 0
      });
      
      return await this.repository.save(team);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves all teams
   * @returns Array of teams
   */
  static async findAll(): Promise<Team[]> {
    return await this.repository.find();
  }

  /**
   * Retrieves a team by ID
   * @param id Team ID
   * @returns Team or null if not found
   */
  static async findById(id: number): Promise<Team | null> {
    return await this.repository.findOneBy({ id });
  }

  /**
   * Updates a team by ID
   * @param id Team ID
   * @param teamData Updated team data
   * @returns Updated team or null if not found
   */
  static async update(id: number, teamData: Partial<Team>): Promise<Team | null> {
    await this.repository.update(id, teamData);
    return await this.findById(id);
  }

  /**
   * Deletes a team by ID
   * @param id Team ID
   * @returns Boolean indicating if team was deleted
   */
  static async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }

  /**
   * Updates team points
   * @param id Team ID
   * @param points New points value
   * @returns Updated team or null if not found
   */
  static async updatePoints(id: number, points: number): Promise<Team | null> {
    await this.repository.update(id, { points });
    return await this.findById(id);
  }
} 