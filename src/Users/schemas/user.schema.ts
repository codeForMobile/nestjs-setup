import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose'

export type UserDocument = UserDBModel & Document

@Schema({ collection: 'user'})
export class UserDBModel {

    @Prop()
    userId: string
    
    @Prop()
    email: string
    
    @Prop()
    age: number
}

export const UserSchema = SchemaFactory.createForClass(UserDBModel)