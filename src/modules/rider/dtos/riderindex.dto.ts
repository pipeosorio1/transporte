import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RiderIndexDto {
  @ApiProperty({
    description: 'usuario id',
    required: true,
    type: Number,
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  readonly user_id: number;
}
