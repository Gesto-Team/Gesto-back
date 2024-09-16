import { Injectable, UnauthorizedException, Request } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import configuration from 'src/config/configuration';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Role, UserDocument } from '../users/user.schema';
import { AuthResponse, TokenResponse } from './auth.interface';
import HasherProvider from './hasher/hasher.interface';
import { jwtDecode } from 'jwt-decode';

@Injectable()
export class AuthService {
  constructor(
    private hasherService: HasherProvider,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**************************************************************************
   PUBLIC METHODS************************************************************
   **************************************************************************/

  public async register(createUserDto: CreateUserDto): Promise<AuthResponse> {
    const user = await this.usersService.create({
      username: createUserDto.username,
      password: await this.hasherService.hash(createUserDto.password),
      role: Role.USER, // Assign default role
    });
    return {
      ...this._generateTokens(user.id),
      userId: user.id,
      role: user.role,
    };
  }

  /**
   * Login user
   * @param user
   * @returns access_token and refresh_token
   */
  public async login(@Request() req: any): Promise<AuthResponse> {
    const user = await this.usersService.findOne(req.id);
    return {
      ...this._generateTokens(user.id),
      userId: user.id,
      role: user.role,
    };
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
    const userId = jwtDecode(refreshToken);
    const user = await this.usersService.findOne(userId.sub || 'no user id');
    return {
      ...this._generateTokens(user.id),
      userId: user.id,
      role: user.role,
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
      throw new UnauthorizedException('Email invalide');
    }
    const isPasswordValid = await this.hasherService.compare(
      pass,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Mot de passe invalide');
    }
    return user;
  }

  /**************************************************************************
   PRIVATE METHODS***********************************************************
   **************************************************************************/

  /**
   * Generate access token and refresh token
   * @param userId
   * @param roles
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
