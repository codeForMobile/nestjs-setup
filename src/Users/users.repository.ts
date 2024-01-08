import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserDBModel, UserDocument } from "./schemas/user.schema";
import { FilterQuery, Model } from "mongoose";

@Injectable()
export class UsersRepository {
    constructor(@InjectModel(UserDBModel.name) private userModel: Model<UserDocument>){}

    async findOne(userFilterQuery: FilterQuery<UserDBModel>): Promise<UserDBModel> {
        return this.userModel.findOne(userFilterQuery)
    }

    async find(userFilterQuery: FilterQuery<UserDBModel>): Promise<UserDBModel[]> {
        return this.userModel.find(userFilterQuery)
    }

    async create(user: UserDBModel): Promise<UserDBModel> {
        const newUser = new this.userModel(user)
        return newUser.save()
    }

    async findOneAndUpdate(userFilterQuery: FilterQuery<UserDBModel>, user: Partial<UserDBModel>): Promise<UserDBModel> {
        return this.userModel.findOneAndUpdate(userFilterQuery, user, {new: true})
    }

    // TODO:Delete
}