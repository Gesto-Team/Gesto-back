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
import JwtRefreshGuard from './Jwt/jwtRefresh-auth.guard';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LocalAuthGuard } from './Passport/local-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { UserDocument } from '../users/user.schema';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  public async register(
    @Res() res: Response,
    @Body() createUserDto: CreateUserDto,
  ) {
    const { accessToken, refreshToken, userId } =
      await this.authService.register(createUserDto);
    return res
      .cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      })
      .json({
        access_token: accessToken,
        userId: userId,
      });
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Res() res: Response, @Req() req: Request) {
    const { accessToken, refreshToken, userId } = await this.authService.login(
      req.user as UserDocument,
    );
    return res
      .cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      })
      .json({
        access_token: accessToken,
        userId: userId,
      });
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  public async refresh(@Res() res: Response, @Req() req: Request) {
    const { accessToken, refreshToken } = await this.authService.refreshToken(
      req.cookies.refresh_token,
    );
    return res
      .cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      })
      .json({ access_token: accessToken });
  }
}
