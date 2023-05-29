import { Rider } from './schemas/rider.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { RiderRepository } from './repositories/rider.repository';
import { RiderStoreDto } from './dtos/rider-store.dto';
import { RiderIndexDto } from './dtos/riderindex.dto';

@Injectable()
export class RiderService {
  constructor(
    @InjectModel(Rider.name) private rider: Model<Rider>,
    private readonly repository: RiderRepository,
  ) {}

  async register(data: RiderStoreDto): Promise<Rider[]> {
    const { items } = data;
    const errors = [];
    for (const item of items) {
      const { user_id: userId } = item;

      const dataRiderIndex: RiderIndexDto = { user_id: userId };
      const rider = await this.repository.getByUserId(dataRiderIndex);

      if (!rider) {
        await this.rider.create([item]);
      } else {
        errors.push({ rider: `already registered rider ${userId}` });
      }
    }

    return errors;
  }
}
