import { Body, Controller, Post } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ApiTags } from '@nestjs/swagger';
import { SeedDto } from './dto/seed.dto';

@ApiTags('seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post('users')
  public seed(@Body() nbSeeds: SeedDto) {
    return this.seedService.seedUsers(nbSeeds);
  }

  @Post('companies')
  public seedCompanies(@Body() nbSeeds: SeedDto) {
    return this.seedService.seedCompanies(nbSeeds);
  }
}
