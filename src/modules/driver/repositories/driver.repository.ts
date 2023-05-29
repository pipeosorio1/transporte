import { Driver } from 'modules/driver/schemas/driver.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class DriverRepository {
  constructor(
    @InjectModel(Driver.name) private readonly driver: Model<Driver>,
  ) {}

  async getByAvailable(): Promise<any> {
    return await this.driver
      .findOne({
        $and: [{ available: 1 }],
      })
      .sort({ updatedAt: 1 })
      .exec();
  }

  async findById(id: string): Promise<any> {
    return await this.driver.findById(id).exec();
  }

  async getByVehiclePlate(vehiclePlate: string): Promise<any> {
    return await this.driver
      .findOne({
        $and: [{ vehicle_plate: vehiclePlate }],
      })
      .exec();
  }
}
