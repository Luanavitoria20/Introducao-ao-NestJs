import { Module } from '@nestjs/common';
import { PlaceController } from './place.controller';
import { PlaceService } from './place.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CloudinaryService } from './cloudinary.service';

@Module({
  imports: [PrismaModule],
  controllers: [PlaceController],
  providers: [PlaceService, CloudinaryService],
  exports: [],
})
export class PlaceModule {}
