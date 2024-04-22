import {
  Controller,
  Post,
  UseGuards,
  Get,
  Body,
  UsePipes,
  ValidationPipe,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LocalAuthGuard } from 'src/auth/Passport/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './Jwt/jwt-auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import JwtRefreshGuard from './Jwt/jwtRefresh-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    const accessToken = await this.authService.createAccessToken(user.id);
    const refreshToken = await this.authService.createRefreshToken(user.id);

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    return res.json({
      access_token: accessToken,
      userId: user.userId,
    });
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Res() res: Response, @Body() createUserDto: CreateUserDto) {
    const user = await this.authService.login(createUserDto);
    const accessToken = await this.authService.createAccessToken(user.id);
    const refreshToken = await this.authService.createRefreshToken(user.id);
    console.log(accessToken, refreshToken, user.id);

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    return res.json({
      access_token: accessToken,
      userId: user.userId,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: any) {
    return this.usersService.findOneByUsername(req.user.username);
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  async refresh(@Res() res: Response, @Req() req: Request) {
    const newRefreshToken = await this.authService.createRefreshToken(
      req.cookies.refresh_token.sub,
    );
    const newAccessToken = await this.authService.createAccessToken(
      req.cookies.refresh_token.sub,
    );

    // Set custom expiration time for refresh token (e.g., 7 days)
    const refreshExpiration = new Date();
    refreshExpiration.setDate(refreshExpiration.getDate() + 7); // Set expiration to 7 days from now
    res.cookie('refresh_token', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: refreshExpiration,
    });

    return res.send({ access_token: newAccessToken });
  }
}
