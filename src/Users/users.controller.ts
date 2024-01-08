import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserDBModel } from "./schemas/user.schema";
import { CreateUserDbDto } from "./dto/inputDb/create-userDB.dto";
import { UpdateUserDbDto } from "./dto/inputDb/update-userDB.dto";

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get(':userId')
    async getUser(@Param('userId') userId: string): Promise<UserDBModel>{
        return this.usersService.getUserByIdDB(userId)
    }

    @Get()
    async getUsers(): Promise<UserDBModel[]>{
        return this.usersService.getUsersDB()
    }

    @Post()
    async createUser(@Body() createUserDbDto: CreateUserDbDto): Promise<UserDBModel> {
        return this.usersService.createUserDB(createUserDbDto.email, createUserDbDto.age)
    }

    @Patch(':userId')
    async updateUser(@Param('userId') userId: string, @Body() updateUserDbDto: UpdateUserDbDto): Promise<UserDBModel>{
        return this.usersService.updateUserDB(userId, updateUserDbDto)
    }
}