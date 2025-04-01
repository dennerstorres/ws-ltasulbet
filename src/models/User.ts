import { AppDataSource } from '../config/ormconfig';
import { User } from '../entities/User';
import { PasswordService } from '../services/passwordService';

export class UserModel {
  private static repository = AppDataSource.getRepository(User);

  static async create(userData: Partial<User>): Promise<User> {
    try {
      const hashedPassword = await PasswordService.hashPassword(userData.senha || '');

      const user = this.repository.create({
        name: userData.name,
        email: userData.email,
        senha: hashedPassword,
        points: userData.points || 0,
        isAdmin: userData.isAdmin || false
      });
      
      const savedUser = await this.repository.save(user);
      const { senha, ...userWithoutPassword } = savedUser;
      console.log('User created successfully:', userWithoutPassword);
      return savedUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  static async findAll(): Promise<User[]> {
    const users = await this.repository.find();
    return users.map(({ senha, ...userWithoutPassword }) => userWithoutPassword as User);
  }

  static async findById(id: number): Promise<User | null> {
    const user = await this.repository.findOneBy({ id });
    if (!user) return null;
    const { senha, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  }

  static async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOneBy({ email });
    if (!user) return null;
    const { senha, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  }

  static async update(id: number, userData: Partial<User>): Promise<User | null> {
    if (userData.senha) {
      userData.senha = await PasswordService.hashPassword(userData.senha);
    }
    
    await this.repository.update(id, userData);
    return await this.findById(id);
  }

  static async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected ? result.affected > 0 : false;
  }

  static async updatePoints(id: number, points: number): Promise<User | null> {
    await this.repository.update(id, { points });
    return await this.findById(id);
  }

  static async validatePassword(email: string, password: string): Promise<User | null> {
    const user = await this.repository.findOneBy({ email });
    if (!user) return null;

    const isValid = await PasswordService.comparePasswords(password, user.senha);
    if (!isValid) return null;

    const { senha, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  }
} 