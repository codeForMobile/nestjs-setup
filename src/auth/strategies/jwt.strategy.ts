import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/Users/models/user";
import { UsersService } from "src/Users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private readonly usersService: UsersService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration:false,
            secretOrKey: process.env.jwtSecret
        })
    }

    validate(validationPayload: {email: string, sub: string}): User | null {
        return this.usersService.getUserByEmail(validationPayload.email)
    }
}