import { HttpStatus, INestApplication } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import * as request from 'supertest';

import { ProductsModule } from '@infrastructure/modules/products.module';

describe('ProductsController (e2e)', () => {
  let app: INestApplication;
  let mongoServer: MongoMemoryServer;
  let endpoint: string;
  let createProductDto: {
    productId: string;
    name: string;
    description: string;
    price: number;
    stock: number;
  };

  beforeEach(async () => {
    endpoint = '/products';
    createProductDto = {
      productId: '123',
      name: 'Test Product',
      description: 'A test product',
      price: 100.0,
      stock: 10,
    };
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = await mongoServer.getUri();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(mongoUri),
        MongooseModule.forFeature([
          {
            name: 'Product',
            schema: import('@infrastructure/database/models/product.model'),
          },
        ]),
        ProductsModule,
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
      const response = await request(app.getHttpServer())
        .post(endpoint)
        .send(createProductDto);
      expect(response.status).toEqual(HttpStatus.CREATED);
    });

    it(`${endpoint} (POST) should throw an error if product already exists`, async () => {
      await request(app.getHttpServer()).post(endpoint).send(createProductDto);

      await request(app.getHttpServer())
        .post(endpoint)
        .send(createProductDto)
        .catch((error) => {
          expect(error.response.data).toEqual(``);
        });
    });
  });

  describe('findOne', () => {
    it(`${endpoint}/:id (GET)`, async () => {
      await request(app.getHttpServer()).post(endpoint).send(createProductDto);

      const response = await request(app.getHttpServer())
        .get(`${endpoint}/${createProductDto.productId}`)
        .expect(HttpStatus.OK);
      expect(response.body).toEqual(createProductDto);
    });

    it(`${endpoint}/:id (GET) should throw an error if product not found`, async () => {
      await request(app.getHttpServer())
        .get(`${endpoint}/123`)
        .catch((error) => {
          expect(error.response.data).toEqual(``);
        });
    });
  });

  describe('update', () => {
    it(`${endpoint}/:id (PATCH)`, async () => {
      const { productId, ...restProduct } = createProductDto;
      await request(app.getHttpServer()).post(endpoint).send(createProductDto);
      const response = await request(app.getHttpServer())
        .patch(`${endpoint}/${productId}`)
        .send(restProduct);
      expect(response.status).toEqual(HttpStatus.OK);
    });

    it(`${endpoint}/:id (PATCH) should throw an error if product not found`, async () => {
      await request(app.getHttpServer())
        .patch(`${endpoint}/123`)
        .send(createProductDto)
        .catch((error) => {
          expect(error.response.data).toEqual(``);
        });
    });
  });

  describe('delete', () => {
    it(`${endpoint}/:id (DELETE)`, async () => {
      await request(app.getHttpServer()).post(endpoint).send(createProductDto);

      const response = await request(app.getHttpServer())
        .delete(`${endpoint}/${createProductDto.productId}`)
        .expect(HttpStatus.OK);
      expect(response.body).toEqual({});
    });

    it(`${endpoint}/:id (DELETE) should throw an error if product not found`, async () => {
      await request(app.getHttpServer())
        .delete(`${endpoint}/123`)
        .catch((error) => {
          expect(error.response.data).toEqual(``);
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
