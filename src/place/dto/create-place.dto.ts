import { 
    IsEnum, IsNotEmpty, IsNumber, IsString, 
} from "class-validator";
import { placeType } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class CreatePlaceDto{
    @ApiProperty({ example: 'Praça Central'})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ 
        enum: placeType,
         example: 'RESTAURANTE'
    })
    @IsEnum(placeType)
    type: placeType;

    @ApiProperty({example: '(88) 9999-9999'})
    @IsString()
    phone:  string

    @ApiProperty({ example: -3.7327 })
    @IsNumber()
    @Type(() => Number)
    latitude: number;

    @ApiProperty({ example: -38.5267 })
    @IsNumber()
    @Type(() => Number)
    longitude: number;
   
}