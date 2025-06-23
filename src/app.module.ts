import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersService } from './users/users.service';


@Module({
  imports: [UserModule, PrismaModule],
  controllers: [], 
  providers: [UsersService], 
})
export class AppModule {}
