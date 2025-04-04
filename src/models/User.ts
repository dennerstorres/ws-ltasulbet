import { AppDataSource } from '../config/ormconfig';
import { User } from '../entities/User';
import { PasswordService } from '../services/passwordService';

export class UserModel {
  private static repository = AppDataSource.getRepository(User);

  /**
   * Creates a new user with hashed password
   * @param userData User data including password
   * @returns Created user without password
   */
  static async create(userData: Partial<User>): Promise<User> {
    try {
      const hashedPassword = await PasswordService.hashPassword(userData.password || '');

      const user = this.repository.create({
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        points: userData.points || 0,
        isAdmin: userData.isAdmin || false
      });
      
      const savedUser = await this.repository.save(user);
      const { password, ...userWithoutPassword } = savedUser;
      return savedUser;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Retrieves all users without their passwords
   * @returns Array of users without passwords
   */
  static async findAll(): Promise<User[]> {
    const users = await this.repository.find();
    return users.map(({ password, ...userWithoutPassword }) => userWithoutPassword as User);
  }

  /**
   * Retrieves a user by ID without password
   * @param id User ID
   * @returns User without password or null if not found
   */
  static async findById(id: number): Promise<User | null> {
    const user = await this.repository.findOneBy({ id });
    if (!user) return null;
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  }

  /**
   * Retrieves a user by email without password
   * @param email User email
   * @returns User without password or null if not found
   */
  static async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOneBy({ email });
    if (!user) return null;
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  }

  /**
   * Updates a user by ID
   * @param id User ID
   * @param userData Updated user data
   * @returns Updated user without password or null if not found
   */
  static async update(id: number, userData: Partial<User>): Promise<User | null> {
    if (userData.password) {
      userData.password = await PasswordService.hashPassword(userData.password);
    }
    
    await this.repository.update(id, userData);
    return await this.findById(id);
  }

  /**
   * Deletes a user by ID
   * @param id User ID
   * @returns Boolean indicating if user was deleted
   */
  static async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }

  /**
   * Updates user points
   * @param id User ID
   * @param points New points value
   * @returns Updated user without password or null if not found
   */
  static async updatePoints(id: number, points: number): Promise<User | null> {
    await this.repository.update(id, { points });
    return await this.findById(id);
  }

  /**
   * Updates user password
   * @param id User ID
   * @param currentPassword Current password
   * @param newPassword New password
   * @returns Boolean indicating if password was updated
   */
  static async updatePassword(id: number, currentPassword: string, newPassword: string): Promise<boolean> {
    const user = await this.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await PasswordService.comparePasswords(currentPassword, user.password);
    if (!isPasswordValid) {
      throw new Error('Current password is incorrect');
    }

    const hashedPassword = await PasswordService.hashPassword(newPassword);
    await this.repository.update(id, { password: hashedPassword });
    return true;
  }

  /**
   * Validates user password
   * @param email User email
   * @param password Password to validate
   * @returns User without password if valid, null otherwise
   */
  static async validatePassword(email: string, password: string): Promise<User | null> {
    const user = await this.findByEmail(email);
    if (!user) {
      return null;
    }

    const isPasswordValid = await PasswordService.comparePasswords(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  }
} 