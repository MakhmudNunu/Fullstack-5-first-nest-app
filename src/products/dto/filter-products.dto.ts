import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Category } from '../schemas/product.schema';
import { Transform } from 'class-transformer';

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export class GetProductsFilterDto {
  @IsString()
  @IsOptional()
  search: string;

  @IsString()
  @IsOptional()
  category: Category;

  @IsEnum(SortOrder, {
    message: 'Сортировка по названию должна быть asc или desc',
  })
  @IsOptional()
  sortTitle: SortOrder;

  @IsEnum(SortOrder, { message: 'Сортировка по цене должна быть asc или desc' })
  @IsOptional()
  sortPrice: SortOrder;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt({ message: 'Лимит должен быть целым числом' })
  @Min(1, { message: 'Лимит не может быть меньше 1' })
  limit: number = 10;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt({ message: 'Страница должна быть целым числом' })
  @Min(1, { message: 'Страница не может быть меньше 1' })
  page: number = 1;
}
