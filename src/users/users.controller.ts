import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/create-user.dto';
import {  ApiTags, ApiBody, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

  
@ApiTags('users') // Tag para agrupar essas rotas no Swagger
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /* @Post() // Rota cria usuario 
  @ApiOperation({summary: 'Criar um novo usuario'}) // summary e tipo um resumo
  @ApiBody({type: CreateUserDto})
  @ApiResponse({status:201, description: 'Usuário criado com sucesso!'})
  @ApiResponse({ status: 409, description: 'E-mail já está em uso!' })  
  @ApiResponse({ status: 500, description: 'Erro interno do servidor!' }) 
   create(@Body() data: CreateUserDto) {
    return this.usersService.create(data);
   }*/


@Get() // lista todos 
 @ApiOperation({ summary: 'Listar todos os usuários' })
    @ApiResponse({ status: 200,
      description: 'Lista de usuários retornada com sucesso.' 
    })
findAll(){
   return this.usersService.findAll()
}

@Get(':id') 
 @ApiOperation({ summary: 'Buscar um usuário por ID' })
    @ApiResponse({ status: 200, 
      description: 'Usuário encontrado.' })
    @ApiResponse({ status: 404,
       description: 'Usuário não encontrado.' })
    @ApiParam({ 
      name: 'id', type: String,
      description: 'ID do usuário' 
    })
findOne( @Param('id') id: string){
      return this.usersService.findOne(id)
} 

@Put(':id')
@ApiOperation({ summary: 'Atualizar um usuário' })
    @ApiResponse({ status: 200, 
      description: 'Usuário atualizado com sucesso.' 
    })
    @ApiParam({ 
      name: 'id', type: String,
      description: 'ID do usuário' })
    @ApiBody({ type: UpdateUserDto })
update(@Param('id') id: string, @Body() data:any){
  return this.usersService.update(id, data)
}

@Delete(':id')
@ApiOperation({ summary: 'Remover um usuário' })
    @ApiResponse({ status: 200, 
      description: 'Usuário removido com sucesso.' })
    @ApiParam({
      name: 'id', type: String,
      description: 'ID do usuário'
    })
remove( @Param('id') id: string){
  return this.usersService.remove(id)
}

}