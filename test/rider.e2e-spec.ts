import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { RiderStoreDto } from 'modules/rider/dtos/rider-store.dto';
import { AppModule } from 'app.module';

describe('RiderController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/rider (POST)', async () => {
    const riderStoreDto: RiderStoreDto = {
      items: [
        {
          user_id: 5,
          token_card: '123456789',
          email: 'test@test.com',
        },
      ],
    };
    return request(app.getHttpServer())
      .post('/rider')
      .send(riderStoreDto)
      .expect(200)
      .expect({ status: 'CREATED' });
  });
});
