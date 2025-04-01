import jwt from 'jsonwebtoken';
import { User } from '../entities/User';

interface TokenPayload {
  id: number;
  email: string;
  isAdmin: boolean;
}

export class JWTService {
  private static readonly secret = process.env.JWT_SECRET || 'your-secret-key';
  private static readonly expiresIn = '24h';

  /**
   * Gera um token JWT para o usuário
   * @param user Usuário para gerar o token
   * @returns Token JWT
   */
  static generateToken(user: Partial<User>): string {
    const payload: TokenPayload = {
      id: user.id!,
      email: user.email!,
      isAdmin: user.isAdmin || false
    };

    return jwt.sign(payload, this.secret, {
      expiresIn: process.env.JWT_EXPIRES_IN || this.expiresIn
    });
  }

  /**
   * Verifica e decodifica um token JWT
   * @param token Token JWT para verificar
   * @returns Payload decodificado ou null se inválido
   */
  static verifyToken(token: string): TokenPayload | null {
    try {
      const decoded = jwt.verify(token, this.secret) as TokenPayload;
      return decoded;
    } catch (error) {
      return null;
    }
  }

  /**
   * Extrai o token do cabeçalho de autorização
   * @param authHeader Cabeçalho de autorização
   * @returns Token limpo ou null se inválido
   */
  static extractTokenFromHeader(authHeader: string | undefined): string | null {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    return authHeader.split(' ')[1];
  }
} 