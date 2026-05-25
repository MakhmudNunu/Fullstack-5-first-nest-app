import { IsMongoId } from "class-validator";

export class IdParamDto {
    @IsMongoId({ message: 'Некорректный формат идентификатора ( must be MongoId )' })
    id: string;
}