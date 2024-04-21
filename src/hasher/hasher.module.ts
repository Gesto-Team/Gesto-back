import { Module } from '@nestjs/common';
import { HasherService } from './hasher.service';

@Module({
  providers: [HasherService],
})
export class HasherModule {}
