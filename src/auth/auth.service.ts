import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HasherService } from 'src/hasher/hasher.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private hasherService: HasherService,
  ) {}

  /**
   * Validate user
   * @param username
   * @param password
   * @returns user without password if valid, null otherwise
   */
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    //check if user exists and if the password correspond to the one stored in database
    if (user && (await this.hasherService.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * Login user
   * @param user
   * @returns access_token
   */
  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
