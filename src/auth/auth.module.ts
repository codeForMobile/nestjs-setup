import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/Users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: process.env.jwtSecret,
      signOptions: {
        expiresIn: '3600s'
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy]
})
export class AuthModule {}
