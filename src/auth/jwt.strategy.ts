
import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() ,
            secretOrKey: 'meu_segredo'// ideal usar .env
        })
    }

    async validate(payload: any){
        return {
            userId: payload.userId,
            email: payload.email,
            role: payload.role
        }
    }
    
}