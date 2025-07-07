import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";


@Injectable()
export class TuristaGuard implements CanActivate{

    canActivate(context: ExecutionContext):boolean{
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        return user?.role === 'TURISTA'   
    }
}