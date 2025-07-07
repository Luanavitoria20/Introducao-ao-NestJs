
import { 
    IsEmail,IsString, MinLength 
} from 'class-validator'

import { ApiProperty } from '@nestjs/swagger'

export class RegisterUserDto{

    @ApiProperty({
        description: "Nome do Usúario.",
        example: "Luana Vitoria"
    })
    @IsString()
    name: string
    
    @ApiProperty({
        description: "Email do Usúario.",
        example: "luana@gmail.com"
    })
    @IsEmail()
    email: string

    @ApiProperty({
        description: "Senha do Usúario.",
        example: "senha123"
    })
    @IsString()
    @MinLength(6)
    password: string
}