import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
        private readonly productsService: ProductsService
    ) {}

    async createOrder(userId: string, createOrderDto: CreateOrderDto): Promise<OrderDocument> {
        let total = 0
        const items: { productId: string, quantity: number }[] = []

        for(let i = 0; i < createOrderDto.productIds.length; i++) {
            const productId = createOrderDto.productIds[i]
            const quantity = createOrderDto.quantities[i]

            const product = await this.productsService.findProductById(productId)
            if (!product) {
                throw new NotFoundException(`Товар с ID: ${productId} - не найден`)
            }

            total += product.price * quantity
            items.push({productId: productId.toString(), quantity})
        }

        const order = new this.orderModel({
            userId,
            name: createOrderDto.name,
            phone: createOrderDto.phone,
            address: createOrderDto.address,
            comment: createOrderDto.comment,
            items,
            total
        })

        return order.save()
    }

    async updateStatus(id: string, status: string){
        const order = await this.getOrderById(id)

        if (!order) {
            throw new NotFoundException('Заказ не найден')
        }

        Object.assign(order, {status})
        return order.save()
        
    }

    async getUserOrders(userId: string): Promise<OrderDocument[]> {
        return this.orderModel.find({userId}).sort({createdAt: -1}).exec()
    }

    async getAllOrders(): Promise<OrderDocument[]> {
        return this.orderModel.find().sort({createdAt: -1}).exec()
    }

    async getOrderById(id: string): Promise<OrderDocument> {
        const order = await this.orderModel.findById(id).exec()

        if (!order) {
            throw new NotFoundException('Заказ не найден')
        }

        return order

    }


}
