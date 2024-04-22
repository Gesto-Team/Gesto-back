import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import configuration from 'src/config/configuration';
import { HasherService } from 'src/hasher/hasher.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private hasherService: HasherService,
  ) {}

  /**
   * Login user
   * @param user
   * @returns access_token and refresh_token
   */
  async login(createUserDto: CreateUserDto): Promise<any> {
    const user = await this.usersService.findOneByUsername(
      createUserDto.username,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }
    const isPasswordValid = await this.hasherService.compare(
      createUserDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    return user;
  }

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
  async createAccessToken(user: any) {
    return this.jwtService.sign(
      { username: user.username, sub: user.userId },
      { secret: configuration().jwtSecret, expiresIn: '15m' },
    );
  }

  /**
   * Create refresh token
   * @param user
   * @returns refresh token
   */
  async createRefreshToken(userId: any) {
    return this.jwtService.sign(
      { sub: userId },
      { secret: configuration().jwtRefreshSecret, expiresIn: '7d' },
    );
  }

  /**
   * Decode refresh token
   * @param token
   * @returns if refresh token is valid, return decoded token
   */
  async decodeRefreshToken(token: string) {
    try {
      return await this.jwtService.verify(token, {
        secret: configuration().jwtRefreshSecret,
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
