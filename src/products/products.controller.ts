import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { GetProductsFilterDto } from "./dto/filter-products.dto";
import { CreateProductDto } from "./dto/create-product.dto";
import { IdParamDto } from "./dto/id-param.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { Public } from "src/auth/decorators/public.decorator";
import { Roles } from "src/auth/decorators/roles.decorator";
import { Role } from "src/users/enums/role.enum";

@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    // Создать
    @Roles(Role.ADMIN)
    @Post()
    async createProduct(
        @Body() productData: CreateProductDto
    ) {
        return this.productsService.createProduct(productData)
    }

    // Получить все
    @Public()
    @Get()
    async findAllProducts(@Query() filters: GetProductsFilterDto) {
        return this.productsService.findAllProducts(filters)
    }

    // Получить один товар по id
    @Public()
    @Get(":id")
    async findProductById(@Param('id') id: IdParamDto) {
        return this.productsService.findProductById(id)
    }

    // Удалить
    @Roles(Role.ADMIN)
    @Delete(":id")
    async deleteProduct(@Param('id') id: IdParamDto) {
        return this.productsService.deleteProduct(id)
    }

    // Обновить
    @Roles(Role.ADMIN)
    @Patch(":id")
    async updateProduct(@Param('id') id: IdParamDto, @Body() updateProductData: UpdateProductDto) {
        return this.productsService.updateProduct(id, updateProductData)
    }
}