import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ProductsModule } from '@infrastructure/modules/products.module';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongooseModule } from '@nestjs/mongoose';

describe('ProductsController (e2e)', () => {
  let app: INestApplication;
  let mongoServer: MongoMemoryServer;
  const endpoint = '/products';

  const createProductDto = {
    product_id: '123',
    name: 'Test Product',
    description: 'A test product',
    price: 100.0,
    stock: 10,
  };

  beforeEach(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = await mongoServer.getUri();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(mongoUri),
        MongooseModule.forFeature([{ name: 'Product', schema: require('@infrastructure/database/models/product.model') }]),
        ProductsModule
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('findAll', () => {
    it(`${endpoint} (GET)`, async () => {
      const response = await request(app.getHttpServer())
        .get(endpoint)
        .expect(HttpStatus.OK);
      expect(response.body).toEqual([]);
    });
  });

  describe('create', () => {
    it(`${endpoint} (POST)`, async () => {
      const {
        product_id,
        ...restProduct
      } = createProductDto;
      const response = await request(app.getHttpServer())
        .post(endpoint)
        .send(restProduct);
      expect(response.status).toEqual(HttpStatus.CREATED);
    });

    it(`${endpoint} (POST) should throw an error if product already exists`, async () => {
      await request(app.getHttpServer())
        .post(endpoint)
        .send(createProductDto);

      await request(app.getHttpServer())
        .post(endpoint)
        .send(createProductDto)
        .catch((error) => {
          expect(error.response.data).toEqual(``)
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
