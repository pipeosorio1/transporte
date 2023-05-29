import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { DriverModule } from 'modules/driver/driver.module';
import { DriverStoreDto } from 'modules/driver/dtos/driver-store.dto';

describe('DriverController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DriverModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('test_successful_registration', async () => {
    const driverStoreDto: DriverStoreDto = {
      items: [
        {
          name: 'John Doe',
          vehicle_plate: 'ABC123',
          available: 1,
        },
      ],
    };
    return request(app.getHttpServer())
      .post('/rider')
      .send(driverStoreDto)
      .expect(200)
      .expect({ status: 'CREATED' });
  });
});
