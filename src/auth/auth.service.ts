import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/Users/models/user';
import { UsersService } from 'src/Users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    validate(email: string, password: string): User | null {
        const user = this.usersService.getUserByEmail(email)
        if (!user) {
            return null
        }

        const passwordValid = password === user.password
        return passwordValid ? user : null
    }

    login(user: User): { access_token: string} {
        const payload = {
            email: user.email,
            sub: user.userId
        }

        return {
            access_token: this.jwtService.sign(payload)
        }
    }

    verify(token: string) {
        const decoded = this.jwtService.verify(token, {
            secret: process.env.jwtSecret
        })

        const user = this.usersService.getUserByEmail(decoded.email)

        if (!user) {
            throw new Error('Unable to get the user from decoded token.')
        }
        return user
    }
}
