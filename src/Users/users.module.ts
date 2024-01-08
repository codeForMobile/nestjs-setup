import { Module } from "@nestjs/common";
import { UsersResolver } from "./users.resolver";
import { UsersService } from "./users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserDBModel, UserSchema } from "./schemas/user.schema";
import { UsersController } from "./users.controller";
import { UsersRepository } from "./users.repository";

@Module({
    providers: [UsersResolver, UsersService, UsersRepository],
    imports: [ MongooseModule.forFeature([{ name: UserDBModel.name, schema: UserSchema}])],
    exports: [UsersService],
    controllers: [UsersController]
})
export class UsersModule{}