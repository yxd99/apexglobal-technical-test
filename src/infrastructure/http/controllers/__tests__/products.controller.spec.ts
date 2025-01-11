import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ModuleMocker } from 'jest-mock';
import { Model } from 'mongoose';

import { ProductUseCase } from '@application/use-cases/product.use-case';
import { Product } from '@domain/entities/product.entity';
import { ProductDocument } from '@infrastructure/database/models/product.model';
import { ProductRepositoryImpl } from '@infrastructure/database/repositories/product.repository.impl';
import { ProductsController } from '@infrastructure/http/controllers/products.controller';
import { ProductPaginationDto } from '@infrastructure/http/dto/products/product.dto';

type MockedModel<T> = Partial<Record<keyof Model<T>, jest.Mock>> & {
  new: jest.MockedFunction<() => Partial<Record<string, jest.Mock>>>;
};

const moduleMock = new ModuleMocker(global);

describe('ProductsController', () => {
  let controller: ProductsController;
  let pagination: ProductPaginationDto;
  let mockProducts: Product[];
  let mockProduct: Product;
  let mockModel: MockedModel<ProductDocument>;
  let mockQuery: {
    skip: jest.Mock<unknown, unknown[], unknown>;
    limit: jest.Mock<unknown, unknown[], unknown>;
    exec: jest.Mock<unknown, unknown[], unknown>;
  };

  beforeEach(async () => {
    mockQuery = {
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(mockProducts),
    };
    mockModel = jest.fn(() => ({
      save: jest.fn(() => Promise.resolve(mockProduct)),
      find: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      findOne: jest.fn(() => Promise.resolve(mockProduct)),
      findOneAndUpdate: jest.fn(() => Promise.resolve(mockProduct)),
      exec: jest.fn().mockResolvedValue(mockProducts),
    })) as unknown as MockedModel<ProductDocument>;

    mockModel.find = jest.fn(() => mockQuery);
    mockModel.findOne = jest.fn().mockResolvedValue(mockProduct);
    mockModel.findOneAndUpdate = jest.fn().mockResolvedValue(mockProduct);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        ProductUseCase,
        {
          provide: 'ProductRepository',
          useClass: ProductRepositoryImpl,
        },
        {
          provide: getModelToken('Product'),
          useValue: mockModel,
        },
      ],
    })
      .useMocker((token) => {
        const mockMetadata = moduleMock.getMetadata(token);
        const mock = moduleMock.generateFromMetadata(mockMetadata);
        return mock;
      })
      .compile();

    pagination = {
      page: 1,
      size: 10,
    };
    mockProducts = Array(pagination.size)
      .fill({
        product_id: '',
        name: 'Test Product',
        description: 'A test product',
        price: 100.0,
        stock: 10,
        created_at: '2025-01-11T01:02:29.500Z',
        updated_at: '2025-01-11T01:02:29.500Z',
      })
      .map((product, i) => ({ ...product, product_id: `${i + 1}` }));
    const [firstProduct] = mockProducts;
    mockProduct = firstProduct;
    controller = module.get<ProductsController>(ProductsController);
  });

  describe('create', () => {
    it('should create a product', async () => {
      jest
        .spyOn(mockModel, 'findOne')
        .mockImplementationOnce(() => Promise.resolve(null));

      const result = await controller.create(mockProduct);
      expect(result).toEqual(mockProduct);
    });

    it('should throw an error if product already exists', async () => {
      try {
        await controller.create(mockProduct);
      } catch (error) {
        expect(error.message).toEqual(
          `Product with id ${mockProduct.product_id} already exists`,
        );
      }
    });
  });

  describe('findAll', () => {
    it('should return all products', async () => {
      const result = await controller.findAll(pagination);
      expect(result).toEqual(mockProducts);
    });

    it('should return an empty array if no products found', async () => {
      const result = await controller.findAll(pagination);
      expect(result).toEqual(mockProducts);
    });

    it('should return an empty array if pagination is invalid', async () => {
      try {
        await controller.findAll({
          page: 0,
          size: 0,
        });
      } catch (error) {
        expect(error.message).toEqual('Page and size must be greater than 0');
      }
    });
  });

  describe('findOne', () => {
    it('should return a product', async () => {
      jest.spyOn(mockModel, 'findOne').mockResolvedValueOnce(mockProduct);
      const result = await controller.findOne(mockProduct.product_id);
      expect(result).toEqual(mockProduct);
    });

    it('should throw an error if product not found', async () => {
      jest.spyOn(mockModel, 'findOne').mockResolvedValue(null);
      try {
        await controller.findOne(mockProduct.product_id);
      } catch (error) {
        expect(error.message).toEqual(
          `Product with id ${mockProduct.product_id} not found`,
        );
      }
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      jest.spyOn(mockModel, 'findOne').mockResolvedValue(mockProduct);
      jest.spyOn(mockModel, 'findOneAndUpdate').mockResolvedValue(mockProduct);
      const result = await controller.update(
        mockProduct.product_id,
        mockProduct,
      );

      expect(result).toEqual(mockProduct);
    });

    it('should throw an error if product not found', async () => {
      jest.spyOn(mockModel, 'findOne').mockResolvedValue(null);
      try {
        await controller.update(mockProduct.product_id, {
          product_id: mockProduct.product_id,
          name: 'Test Product',
          description: 'A test product',
          price: 100.0,
          stock: 10,
        });
      } catch (error) {
        expect(error.message).toEqual(
          `Product with id ${mockProduct.product_id} not found`,
        );
      }
    });
  });

  describe('delete', () => {
    it('should delete a product', async () => {
      jest.spyOn(mockModel, 'findOne').mockResolvedValue(mockProduct);
      const result = await controller.delete(mockProduct.product_id);
      expect(result).toBeUndefined();
    });

    it('should throw an error if product not found', async () => {
      jest.spyOn(mockModel, 'findOne').mockResolvedValue(null);
      try {
        await controller.delete(mockProduct.product_id);
      } catch (error) {
        expect(error.message).toEqual(
          `Product with id ${mockProduct.product_id} not found`,
        );
      }
    });
  });

  describe('ProductPaginationDto', () => {
    it('should create a valid DTO with default values', async () => {
      const dto = plainToClass(ProductPaginationDto, {});
      const errors = await validate(dto);
      expect(errors.length).toBe(0);
      expect(dto.page).toBe(1);
      expect(dto.size).toBe(15);
    });

    it('should validate when page and size are positive numbers', async () => {
      const dto = plainToClass(ProductPaginationDto, { page: 2, size: 10 });
      const errors = await validate(dto);
      expect(errors.length).toBe(0);
    });

    it('should invalidate when page is negative', async () => {
      const dto = plainToClass(ProductPaginationDto, { page: -1 });
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints.isPositive).toBeDefined();
    });

    it('should invalidate when size is negative', async () => {
      const dto = plainToClass(ProductPaginationDto, { size: -5 });
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints.isPositive).toBeDefined();
    });

    it('should invalidate when page is not a number', async () => {
      const dto = plainToClass(ProductPaginationDto, { page: 'string' });
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints.isNumber).toBeDefined();
    });

    it('should invalidate when size is not a number', async () => {
      const dto = plainToClass(ProductPaginationDto, { size: 'string' });
      const errors = await validate(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints.isNumber).toBeDefined();
    });
  });
});
