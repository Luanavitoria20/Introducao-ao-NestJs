import { ApiProperty ,PartialType } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty } from "class-validator"
export class CreateUserDto {
    
    @ApiProperty({
        example:'Luana vitoria',
         description:'Nome completo do usuário'
    })
    @IsNotEmpty({ message:'O nome é obrigatorio!'})
    name: string

    @ApiProperty({
        example:'luanavitoria@gmail.com',
        description:'Email do usuário'
    })
    @IsEmail({}, {message:"O email deve ser um endereço válido"})
    email: string
}

 export class UpdateUserDto extends PartialType(CreateUserDto) {

}