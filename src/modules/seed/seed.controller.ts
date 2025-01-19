import { Body, Controller, Post } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ApiTags } from '@nestjs/swagger';
import { SeedDto, SeedProductDto } from './dto/seed.dto';

@ApiTags('seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post('users')
  public seed(@Body() seedUsersDto: SeedDto) {
    return this.seedService.seedUsers(seedUsersDto);
  }

  @Post('companies')
  public seedCompanies(@Body() seedCompaniesDto: SeedDto) {
    return this.seedService.seedCompanies(seedCompaniesDto);
  }

  @Post('products')
  public seedProducts(@Body() seedProductDto: SeedProductDto) {
    return this.seedService.seedProducts(seedProductDto);
  }
}
