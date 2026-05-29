import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { GetProductsFilterDto } from './dto/filter-products.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { IdParamDto } from './dto/id-param.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // Создать
  @Post()
  async createProduct(@Body() productData: CreateProductDto) {
    return this.productsService.createProduct(productData);
  }

  // Получить все
  @Get()
  async findAllProducts(@Query() filters: GetProductsFilterDto) {
    return this.productsService.findAllProducts(filters);
  }

  // Получить один товар по id
  @Get(':id')
  async findProductById(@Param('id') id: IdParamDto) {
    return this.productsService.findProductById(id);
  }

  // Удалить
  @Delete(':id')
  async deleteProduct(@Param('id') id: IdParamDto) {
    return this.productsService.deleteProduct(id);
  }

  // Обновить
  @Patch(':id')
  async updateProduct(
    @Param('id') id: IdParamDto,
    @Body() updateProductData: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(id, updateProductData);
  }
}
