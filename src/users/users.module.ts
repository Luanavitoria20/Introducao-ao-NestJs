import { Module } from "@nestjs/common";
import { UserController} from "./users.controller"
import { UserService } from "./users.service";

@Module({
    controllers:[UserController],
    providers:[UserService]  // service
})
 export class UserModule {

}