import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auht.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return this.authService.login(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    const user = await this.usersService.findOneByUsername(req.body.username);
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    const user = this.usersService.findOneByUsername(req.user.username);
    return user;
  }

  // @Post('refresh')
  // async refresh(@Response() res: Response, @Request() req: Request) {
  //   const oldRefreshToken = req.cookies['refresh_token'];
  //   const decodedToken =
  //     await this.authService.decodeRefreshToken(oldRefreshToken);

  //   const newRefreshToken = await this.authService.replaceRefreshToken(
  //     decodedToken.sub,
  //     decodedToken.tokenId,
  //   );
  //   const newAccessToken = await this.authService.createAccessToken(
  //     decodedToken.sub,
  //   );

  //   // Set custom expiration time for refresh token (e.g., 30 days)
  //   const refreshExpiration = new Date();
  //   refreshExpiration.setDate(refreshExpiration.getDate() + 30); // Set expiration to 30 days from now

  //   res.cookie('refresh_token', newRefreshToken, {
  //     httpOnly: true,
  //     secure: true,
  //     sameSite: 'strict',
  //     expires: refreshExpiration,
  //   });

  //   return res.send({ access_token: newAccessToken });
  // }
}
