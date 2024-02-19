import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Body,
} from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auht.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Request() req: any) {
    return this.authService.register(req.body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
