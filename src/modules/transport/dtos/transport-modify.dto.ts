import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class TransportModifyDto {
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
    description: 'latitude the driver',
    required: true,
    type: Number,
    example: 6.243499,
  })
  @IsNumber()
  @IsNotEmpty()
  readonly latitude_final: number;

  @ApiProperty({
    description: 'latitude the driver',
    required: true,
    type: Number,
    example: -75.579226,
  })
  @IsNumber()
  @IsNotEmpty()
  readonly longitude_final: number;

  @ApiProperty({
    description: 'KM',
    required: true,
    type: Number,
    example: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  readonly km: number;

  @ApiProperty({
    description: 'minute',
    required: true,
    type: Number,
    example: 60,
  })
  @IsNumber()
  @IsNotEmpty()
  readonly minute: number;
}
