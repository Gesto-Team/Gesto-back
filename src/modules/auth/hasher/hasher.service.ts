import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import HasherProvider from 'src/modules/auth/hasher/hasher.interface';

@Injectable()
export class HasherService implements HasherProvider {
  private static readonly SALT_ROUNDS = 10;

  /**
   * Hash password
   * @param value password
   * @returns hashed password
   */
  public async hash(value: string): Promise<string> {
    return hash(value, HasherService.SALT_ROUNDS);
  }

  /**
   * Compare password
   * @param value password entered by user
   * @param hash hashed password stored in database
   * @returns true if password is correct, false otherwise
   */
  public async compare(value: string, hash: string): Promise<boolean> {
    return compare(value, hash);
  }
}
