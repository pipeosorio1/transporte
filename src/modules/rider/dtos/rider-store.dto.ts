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

class RiderStoreItemDto {
  @ApiProperty({
    description: 'user id',
    required: true,
    type: Number,
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  readonly user_id: number;

  @ApiProperty({
    description: 'token card',
    required: true,
    type: String,
    example: 'tok_test_53841_29d3b797a78d79265CCb50489a5F7679',
  })
  @IsString()
  @IsNotEmpty()
  readonly token_card: string;

  @ApiProperty({
    description: 'email rider',
    required: true,
    type: String,
    example: 1,
  })
  @IsString()
  @IsNotEmpty()
  readonly email: string;
}

export class RiderStoreDto {
  @ApiProperty({
    description: 'Elementos de cambio',
    required: true,
    isArray: true,
    type: RiderStoreItemDto,
  })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RiderStoreItemDto)
  readonly items: RiderStoreItemDto[];
}
