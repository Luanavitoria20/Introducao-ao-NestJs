import { ApiProperty ,PartialType } from "@nestjs/swagger"

export class CreateUserDto {
    
    @ApiProperty({
        example:'Luana vitoria',
         description:'Nome completo do usuário'
    })
    name: string

    @ApiProperty({
        example:'luanavitoria@gmail.com',
        description:'Email do usuário'
    })
    email: string
}

 export class UpdateUserDto extends PartialType(CreateUserDto) {

}