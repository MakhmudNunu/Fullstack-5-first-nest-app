import { Body, Controller, Post, UseGuards, Request, Get, Param, NotFoundException, Patch } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Role } from 'src/users/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('orders')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrdersController {

    constructor(private readonly ordersService: OrdersService) {}

    @Post()
    async createOrder(@Request() req, @Body() createOrderDto: CreateOrderDto) {
       return this.ordersService.createOrder(req.user.userId, createOrderDto)
    }

    // ✅ Исправлено: id в URL, status в body
    @Patch(':id/status')
    @Roles(Role.ADMIN)
    async updateStatus(@Param('id') id: string, @Body('status') status: string) {
        return this.ordersService.updateStatus(id, status)
    }

    @Get()
    async getUserOrders(@Request() req) {
        return this.ordersService.getUserOrders(req.user.userId)
    }

    // ✅ 'all' — до ':id', иначе NestJS проглатывает его как параметр
    @Get('all')
    @Roles(Role.ADMIN)
    async getAllOrders() {
        return this.ordersService.getAllOrders()
    }

    @Get(':id')
    async getOrderById(@Request() req, @Param('id') id: string) {
        const order = await this.ordersService.getOrderById(id)

        if (req.user.role !== Role.ADMIN && order.userId !== req.user.userId) {
            throw new NotFoundException('Заказ не найден')
        }

        return order
    }
}