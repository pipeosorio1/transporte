import { Driver } from './schemas/driver.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { DriverRepository } from './repositories/driver.repository';
import { DriverStoreDto } from './dtos/driver-store.dto';

@Injectable()
export class DriverService {
  constructor(
    @InjectModel(Driver.name) private driver: Model<Driver>,
    private readonly repository: DriverRepository,
  ) {}

  async register(data: DriverStoreDto): Promise<Driver[]> {
    const { items } = data;
    const errors = [];
    for (const item of items) {
      const { vehicle_plate: vehiclePlate } = item;
      const driver = await this.repository.getByVehiclePlate(vehiclePlate);

      if (!driver) {
        await this.driver.create([item]);
      } else {
        errors.push({ driver: `already registered driver ${vehiclePlate}` });
      }
    }

    return errors;
  }
}
