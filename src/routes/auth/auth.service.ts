import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import configuration from 'src/config/configuration';
import { UsersService } from '../users/users.service';
import { HasherService } from 'src/external-services/hasher/hasher.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserDocument } from '../../schemas/user.schema';
import { AuthResponse, TokenResponse } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private hasherService: HasherService,
  ) {}

  /**************************************************************************
   PUBLIC METHODS************************************************************
   **************************************************************************/

  public async register(createUserDto: CreateUserDto): Promise<AuthResponse> {
    const user = await this.usersService.create(createUserDto);
    return { ...this._generateTokens(user.id), userId: user.id };
  }

  /**
   * Login user
   * @param user
   * @returns access_token and refresh_token
   */
  public async login(createUserDto: CreateUserDto): Promise<AuthResponse> {
    const user = await this.validateUser(
      createUserDto.username,
      createUserDto.password,
    );
    return { ...this._generateTokens(user.id), userId: user.id };
  }

  /**
   * Refresh token
   * @param refreshToken
   * @returns access_token and refresh_token
   */
  public async refreshToken(refreshToken: any): Promise<AuthResponse> {
    const isTokenValid = await this.jwtService.verify(refreshToken, {
      secret: configuration().jwtRefreshSecret,
    });
    if (!isTokenValid) {
      throw new UnauthorizedException('Invalid token');
    }
    return {
      ...this._generateTokens(refreshToken.sub),
      userId: refreshToken.sub,
    };
  }

  /**
   * Validate user
   * @param username
   * @param password
   * @returns user without password if valid, null otherwise
   */
  public async validateUser(
    username: string,
    pass: string,
  ): Promise<UserDocument> {
    const user = await this.usersService.findOneByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }
    const isPasswordValid = await this.hasherService.compare(
      pass,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    return user;
  }

  /**************************************************************************
   PRIVATE METHODS***********************************************************
   **************************************************************************/

  /**
   * Generate access token and refresh token
   * @param user
   * @returns access_token and refresh_token
   */
  private _generateTokens(userId: string): TokenResponse {
    // create access token
    const accessToken = this.jwtService.sign(
      { sub: userId },
      { secret: configuration().jwtSecret, expiresIn: '15m' },
    );
    // create refresh token
    const refreshToken = this.jwtService.sign(
      { sub: userId },
      { secret: configuration().jwtRefreshSecret, expiresIn: '7d' },
    );
    return { accessToken, refreshToken };
  }
}
