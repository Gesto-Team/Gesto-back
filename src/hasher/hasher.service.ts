import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import IHasher from 'src/interfaces/hasher.interface';

@Injectable()
export class HasherService implements IHasher {
  private static readonly SALT_ROUNDS = 10;

  /**
   * Hash password
   * @param value password
   * @returns hashed password
   */
  async hash(value: string): Promise<string> {
    return hash(value, HasherService.SALT_ROUNDS);
  }

  /**
   * Compare password
   * @param value password entered by user
   * @param hash hashed password stored in database
   * @returns true if password is correct, false otherwise
   */
  async compare(value: string, hash: string): Promise<boolean> {
    return compare(value, hash);
  }
}
