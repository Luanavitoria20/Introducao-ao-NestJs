import { IsEmail,  IsString } from "class-validator"

export class LoginDto{
    @IsEmail({},{ message:' O email  precisa ser válido'})
    email: string

    @IsString({message: "A Senha precisa ser textual."})
    password: string
}

