import { Rider } from 'modules/rider/schemas/rider.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RiderIndexDto } from '../dtos/riderindex.dto';

@Injectable()
export class RiderRepository {
  constructor(@InjectModel(Rider.name) private readonly rider: Model<Rider>) {}

  async getByUserId(data: RiderIndexDto): Promise<any> {
    return await this.rider
      .findOne({
        $and: [{ user_id: data.user_id }],
      })
      .exec();
  }

  async findById(id: string): Promise<any> {
    return await this.rider.findById(id).exec();
  }
}
