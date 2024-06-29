import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from '@nestjs/config';
import { UsersService } from "src/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwtTokenCheck'){
    constructor(private cfgService: ConfigService, private userService: UsersService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: cfgService.get('JWT_SECRET')
        });
    }

    async validate(payload: {sub: number; email: string;}){
        console.log({origin: 'Validate function in jwt strategy', payload})
        const user = await this.userService.findByUsername(payload.email)
        return user.name
    }
}