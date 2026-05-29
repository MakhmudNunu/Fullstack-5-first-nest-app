import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type Category =
  | 'Молочные'
  | 'Мясо'
  | 'Овощи и фрукты'
  | 'Напитки'
  | 'Бакалея'
  | 'Ноутбуки';

export type ProductDocument = Product & Document;

@Schema({
  timestamps: true,
})
export class Product {
  @Prop({
    required: true,
  })
  title: string;

  @Prop({
    required: true,
  })
  price: number;

  @Prop({
    required: true,
  })
  imageUrl: string;

  @Prop({
    default: 'Нет описания',
  })
  description: string;

  @Prop()
  category: Category;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
