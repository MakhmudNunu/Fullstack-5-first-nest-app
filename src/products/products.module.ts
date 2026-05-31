import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Product, ProductSchema } from "./schemas/product.schema";
import { ProductsController } from "./products.controller";
import { AuthModule } from "src/auth/auth.module";

// Способ оргинизации кода, помогает сделать код чище и читабельнее

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Product.name,
                schema: ProductSchema
            }
        ]),
        AuthModule
    ],
    controllers: [ProductsController],
    providers: [ProductsService],
    exports: [ProductsService]
})

export class ProductsModule {}