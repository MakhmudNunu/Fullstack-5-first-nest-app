import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";

// Способ оргинизации кода, помогает сделать код чище и читабельнее


@Module({
    imports: [],
    controllers: [ProductsController],
    providers: [ProductsService]
})

export class ProductsModule {}