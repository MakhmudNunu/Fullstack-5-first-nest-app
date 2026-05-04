import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { response } from "express";

// Обработка входящих запросов, не занимается выполнением логики

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    getProducts() {
        return this.productsService.getProducts()
    }

    @Post()
    createProducts(@Body() product) {
        return this.productsService.createProduct(product)
    }
}
