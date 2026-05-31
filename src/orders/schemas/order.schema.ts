import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type OrderDocument = Order & Document

@Schema({ timestamps: true })
export class Order {
    @Prop({ required: true })
    userId: string

    @Prop({ required: true })
    name: string

    @Prop({ required: true })
    phone: string

    @Prop({ required: true })
    address: string

    @Prop()
    comment: string

    @Prop({required: true, type: [{productId: String, quantity: Number}]})
    items: { productId: string, quantity: number }[]

    @Prop({ required: true})
    total: number

    @Prop({ enum: ['pending', 'processing', 'completed', 'canceled'], default: 'pending' })
    status: string
}

export const OrderSchema = SchemaFactory.createForClass(Order)