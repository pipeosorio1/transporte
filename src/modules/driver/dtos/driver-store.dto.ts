import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

class DriverStoreItemDto {
  @ApiProperty({
    description: 'name driver',
    required: true,
    type: String,
    example: 1,
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    description: 'vehicle plate',
    required: true,
    type: String,
    example: 'HIE229',
  })
  @IsString()
  @IsNotEmpty()
  readonly vehicle_plate: string;

  @ApiProperty({
    description: 'rider available',
    required: true,
    type: Number,
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  readonly available: number;
}

export class DriverStoreDto {
  @ApiProperty({
    description: 'Elementos de cambio',
    required: true,
    isArray: true,
    type: DriverStoreItemDto,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DriverStoreItemDto)
  readonly items: DriverStoreItemDto[];
}
