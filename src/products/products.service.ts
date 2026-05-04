import { Injectable } from "@nestjs/common";

// Сервисы отвечают за выполенение всеё бизнес-логики

@Injectable()
export class ProductsService {
    getProducts(): string {
        return 'Products list'
    }

    createProduct(product): any {
        console.log(product)
        return product
    }
}