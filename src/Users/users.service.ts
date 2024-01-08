import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid'
import { User } from "./models/user";
import { UserDBModel } from './schemas/user.schema'
import { CreateUserInput } from "./dto/input/create-user.input";
import { UpdateUserInput } from "./dto/input/update-user.input";
import { GetUserArgs } from "./dto/args/get-user.args";
import { GetUsersArgs } from "./dto/args/get-users.args";
import { DeleteUserInput } from "./dto/input/delete-user.input";
import { UsersRepository } from "./users.repository";
import { UpdateUserDbDto } from "./dto/inputDb/update-userDB.dto";

@Injectable()
export class UsersService{

    constructor(private readonly usersRepository: UsersRepository) {}

    private users: User[] = [
        {
            email: 'abc123@gmail.com',
            password: 'abc123',
            age: 33, 
            userId: '123'
        }
    ]

    public createUser(createUserData: CreateUserInput): User {
         const user: User = {
            userId: uuidv4(), 
            ...createUserData
         }

         this.users.push(user)
         return user
    }

    public updateUser(updateUserData: UpdateUserInput): User {
        const user = this.users.find(user => user.userId === updateUserData.userId)
        Object.assign(user, updateUserData)
        return user
    }

    public getUser(getUserArgs: GetUserArgs): User {
        return this.users.find(user => user.userId === getUserArgs.userId)
    }

    public getUsers(getUsersArgs: GetUsersArgs): User[] {
        return getUsersArgs.userIds.map(userId => this.getUser({ userId }))
    }

    public deleteUser(deleteUserData: DeleteUserInput): User {
        const userIndex = this.users.findIndex(user => user.userId === deleteUserData.userId)
        const user = this.users[userIndex]
        this.users.splice(userIndex)
        return user
    }

    public getUserByEmail(email: string): User | undefined {
        return this.users.find(user => user.email === email)
    }

    // DB Op's
    public async createUserDB(email: string, age: number): Promise<UserDBModel>{
        return this.usersRepository.create({
            userId: uuidv4(),
            email,
            age
        })
    }

    public async updateUserDB(userId: string, userUpdates: UpdateUserDbDto): Promise<UserDBModel>{
            return this.usersRepository.findOneAndUpdate({ userId }, userUpdates)
    }

    public async getUserByIdDB(userId: string): Promise<UserDBModel>{
        return this.usersRepository.findOne({userId})
    }

    public async getUsersDB(): Promise<UserDBModel[]>{
        return this.usersRepository.find({})
    }
}
