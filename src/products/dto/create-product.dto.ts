import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Category } from '../schemas/product.schema';

export class CreateProductDto {
  @IsString({ message: 'Название должно быть строкой' })
  @IsNotEmpty({ message: 'Название товара обязательно' })
  title: string;

  @IsString({ message: 'Описание должно быть строкой' })
  @IsOptional()
  description: string;

  @IsNumber({}, { message: 'Цена должна быть числом' })
  @Min(0, { message: 'Цена не должна быть меньше 0' })
  @IsNotEmpty({ message: 'Цена товара обязательна' })
  price: number;

  @IsString({ message: 'Категория товара должна быть строкой' })
  @IsNotEmpty({ message: 'Категория товара обязательна' })
  category: Category;

  @IsString({ message: 'Путь к картинке должен быть строкой' })
  @IsNotEmpty({ message: 'Путь к картинке обязателен' })
  imageUrl: string;
}
