import { Transport } from 'modules/transport/schemas/transport.schema';
import { TransportIndexDto } from '../dtos/transport-index.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TransportRepository {
  constructor(
    @InjectModel(Transport.name) private readonly transport: Model<Transport>,
  ) {}

  async getByRiderIdAndAsset(data: TransportIndexDto): Promise<any> {
    return await this.transport
      .findOne({
        $and: [{ rider_id: data.rider_id }, { state: 1 }],
      })
      .exec();
  }
}
