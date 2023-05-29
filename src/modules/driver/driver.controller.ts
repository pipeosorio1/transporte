import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DriverStoreDto } from './dtos/driver-store.dto';
import { Driver } from './schemas/driver.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DriverService } from './driver.service';

@ApiTags('Driver')
@Controller({ path: 'api/driver' })
export class DriverController {
  constructor(
    @InjectModel(Driver.name) private driver: Model<Driver>,
    private readonly driverService: DriverService,
  ) {}

  @Post()
  public async store(@Body() body: DriverStoreDto): Promise<any> {
    const errors = await this.driverService.register(body);
    if (errors.length > 0) {
      throw new HttpException(
        { status: 'ERROR', error: { ...errors } },
        HttpStatus.BAD_REQUEST,
      );
    }

    return { status: 'CREATED' };
  }
}
