import { Body, Controller, Post } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ApiTags } from '@nestjs/swagger';
import { SeedUserDto } from './dto/seed-user.dto';

@ApiTags('seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post('users')
  seed(@Body() nbSeeds: SeedUserDto) {
    return this.seedService.seedUsers(nbSeeds);
  }
}
