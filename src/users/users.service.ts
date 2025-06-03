import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {

    //Banco de dados fake (array em memoria)
    private users = [
        {id:1, name:'Luana', email:'luana@gmail.com'},
        {id:2, name:'Vitoria', email:'vitoria@gmail.com'}
    ]

    // Faça um metodo que retorne todos os usuarios do banco de dados fake; findAll?
    findAll(): {id:number, name:string, email:string}[] {
        return this.users
    }

    // buscar usuario por ID
    findOne(id: number):{id:number, name:string, email:string} | undefined {

        const foundUser = this.users.find((u)=> u.id === id)

        return foundUser
    }

    // Criar um novo usuario
    create(user:{name:string, email:string}): string{
        
        const newUser = {
            id: this.users.length + 1,
            name: user.name,
            email: user.email
        }

        this.users.push(newUser)

        return `Usuário ${newUser.name} criado com o ID ${newUser.id}`

    }



    
} 