import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql'
import { UsersModule } from './Users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloDriver
    }),
    UsersModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
