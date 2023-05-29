import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TransportIndexDto {
  @ApiProperty({
    description: 'ID Rider',
    required: true,
    type: Number,
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  readonly rider_id: number;
}
