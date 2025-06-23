import { Module } from "@nestjs/common"
import  { UsersController } from "./users.controller"
import { UsersService } from "./users.service"
import { PrismaModule} from "src/prisma/prisma.module"

@Module({
 imports: [PrismaModule],
  providers: [UsersService],
  controllers: [UsersController]

})
export class UserModule {}