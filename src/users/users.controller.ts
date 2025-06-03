import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./users.service";

@Controller('user')
export class UserController {

    private userService: UserService

    constructor(userService: UserService){
        this.userService = userService
    }

    @Get()
    findAllUsers(){
      return  this.userService.findAll()
    }

    @Get(':id')
    findOneUsers( @Param('id') id:string){
        return this.userService.findOne(parseInt(id))
    }

    @Post()
    createUser(@Body() user: {name:string, email:string}){
        return this.userService.create(user)
    }
    
    /*Exercicio  rapido:
    Crie uma rota para atualizar usuario, recebendo o id do usuario a 
    ser atualizado e as novas informacoes de usuario*/


}
