import { AuthGuard } from "@nestjs/passport";

export class JwtGuard extends AuthGuard('jwtTokenCheck'){
    constructor(){
        super()
    }
}