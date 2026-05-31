import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Role } from "../enums/role.enum";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>

@Schema({ timestamps: true })
export class User {
    @Prop({required: true})
    name: string

    @Prop({required: true, unique: true, lowercase: true, trim: true})
    email: string

    @Prop({required: true})
    password: string

    @Prop({type: String, enum: Role, default: Role.USER})
    role: Role
}

export const UserSchema = SchemaFactory.createForClass(User)