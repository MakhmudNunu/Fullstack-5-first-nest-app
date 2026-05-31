import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';

// Способ оргинизации кода, помогает сделать код чище и читабельнее

@Module({
  imports: [
    // Даём доступ к env переменным для всего приложения
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Получаем доступ к базе данных MongoDBAtlas
    MongooseModule.forRoot(process.env.MONGO_URI!),

    // Импорт других модулей
    ProductsModule,

    UsersModule,

    AuthModule,

    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
