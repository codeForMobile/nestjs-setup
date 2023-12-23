import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from 'express'
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { User } from "src/Users/models/user";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Req() req: Request): { access_token: string} {
        return this.authService.login(req.user as User)
    }
}