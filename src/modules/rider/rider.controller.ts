import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RiderStoreDto } from './dtos/rider-store.dto';
import { Rider } from './schemas/rider.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RiderService } from './rider.service';

@ApiTags('Rider')
@Controller({ path: 'api/rider' })
export class RiderController {
  constructor(
    @InjectModel(Rider.name) private rider: Model<Rider>,
    private readonly riderService: RiderService,
  ) {}

  @Post()
  public async store(@Body() body: RiderStoreDto): Promise<any> {
    const errors = await this.riderService.register(body);
    if (errors.length > 0) {
      throw new HttpException(
        { status: 'ERROR', error: { ...errors } },
        HttpStatus.BAD_REQUEST,
      );
    }

    return { status: 'CREATED' };
  }
}
