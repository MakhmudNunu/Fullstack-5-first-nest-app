import { IsArray, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { IdParamDto } from "src/products/dto/id-param.dto";

export class CreateOrderDto {
    @IsString()
    @MinLength(2)
    name: string

    @IsString()
    @MinLength(9)
    phone: string

    @IsString()
    @MinLength(5)
    address: string

    @IsOptional()
    @IsString()
    comment?: string

    @IsArray()
    @IsNumber({}, {each: true})
    productIds: IdParamDto[]

    @IsArray()
    @IsNumber({}, {each: true})
    quantities: number[]
}