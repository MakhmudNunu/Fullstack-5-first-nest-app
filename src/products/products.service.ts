import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model, SortOrder } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductsFilterDto } from './dto/filter-products.dto';
import { IdParamDto } from './dto/id-param.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import type { Category } from './types/category.type';

// Сервисы отвечают за выполенение всеё бизнес-логики

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
  ) {}

  // Создание
  async createProduct(productData: CreateProductDto) {
    return this.productModel.create(productData);
  }

  // Получить все
  async findAllProducts(filters: GetProductsFilterDto) {
    const { search, category, sortTitle, sortPrice, limit, page } = filters;

    interface IQuery {
      title?: any;
      category?: Category;
    }
    // Поиск и фильтрация
    const query: Partial<IQuery> = {};

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    if (category) {
      query.category = category;
    }

    // Сортировка

    interface ISort {
      title?: SortOrder
      price?: SortOrder
    }

    const sort: Partial<ISort> = {};

    if (sortTitle) {
      sort.title = sortTitle === 'asc' ? 1 : -1;
    }

    if (sortPrice) {
      sort.price = sortPrice === 'asc' ? 1 : -1;
    }

    // Пагинация
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.productModel.find(query).sort(sort).skip(skip).limit(limit).exec(),
      this.productModel.countDocuments(query).exec(),
    ]);

    // Возвращаем объект со всей информацией
    return {
      data,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }

  // Получить товар по id
  async findProductById(id: IdParamDto) {
    return this.productModel.findById(id);
  }

  // Удаление
  async deleteProduct(id: IdParamDto) {
    return this.productModel.findByIdAndDelete(id);
  }

  // Обновить продукт
  async updateProduct(id: IdParamDto, updateProductData: UpdateProductDto) {
    return this.productModel.findByIdAndUpdate(id, updateProductData, {
      new: true,
    });
  }
}
