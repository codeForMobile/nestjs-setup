import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql'
import { UsersModule } from './Users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: true,
      driver: ApolloDriver
    }),
    UsersModule,
    AuthModule,
    MongooseModule.forRoot(process.env.mongoURI)
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
