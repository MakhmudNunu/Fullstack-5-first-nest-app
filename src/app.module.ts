import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

// Способ оргинизации кода, помогает сделать код чище и читабельнее

@Module({
  imports: [
    // Даём доступ к env переменным для всего приложения
    ConfigModule.forRoot({
      isGlobal: true
    }),

    // Получаем доступ к базе данных MongoDBAtlas
    MongooseModule.forRoot(
      process.env.MONGO_URI!
    ),

    // Импорт других модулей
    ProductsModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}