import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class TransportStoreDto {
  @ApiProperty({
    description: 'usuario registered in rider',
    required: true,
    type: Number,
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  readonly user_id: number;

  @ApiProperty({
    description: 'latitude the rider',
    required: true,
    type: Number,
    example: 6.1763773,
  })
  @IsNumber()
  @IsNotEmpty()
  readonly latitude_initial: number;

  @ApiProperty({
    description: 'longitude the rider',
    required: true,
    type: Number,
    example: -75.5916529260532,
  })
  @IsNumber()
  @IsNotEmpty()
  readonly longitude_initial: number;

  @ApiProperty({
    description: 'installments for paid',
    required: true,
    type: Number,
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  readonly installments: number;
}
