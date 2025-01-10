import { ModuleMocker } from 'jest-mock';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from '../products.controller';
import { ProductRepositoryImpl } from '@infrastructure/database/repositories/product.repository.impl';
import { ProductUseCase } from '@application/use-cases/product.use-case';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDocument } from '@infrastructure/database/models/product.model';

type MockedModel<T> = Partial<Record<keyof Model<T>, jest.Mock>> & {
  new: jest.MockedFunction<() => Partial<Record<string, jest.Mock>>>;
};

const moduleMock = new ModuleMocker(global);

describe('ProductsController', () => {
  let controller: ProductsController;
  const createProductDto = {
    product_id: '123',
    name: 'Test Product',
    description: 'A test product',
    price: 100.0,
    stock: 10,
  };
  const mockProduct = {
    ...createProductDto,
    created_at: new Date(),
    updated_at: new Date(),
  };
  const mockModel: MockedModel<ProductDocument> = jest.fn(() => ({
    save: jest.fn(() => Promise.resolve(mockProduct)),
    find: jest.fn(() => Promise.resolve([])),
    findOne: jest.fn(() => Promise.resolve(mockProduct)),
    findOneAndUpdate: jest.fn(() => Promise.resolve(mockProduct)),
  })) as any;

  mockModel.find = jest.fn().mockResolvedValue([]);
  mockModel.findOne = jest.fn().mockResolvedValue(mockProduct);
  mockModel.findOneAndUpdate = jest.fn().mockResolvedValue(mockProduct);

  beforeEach(async () => {
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

    controller = module.get<ProductsController>(ProductsController);
  });

  describe('create', () => {
    it('should create a product', async () => {
      jest.spyOn(mockModel, 'findOne').mockImplementationOnce(() => Promise.resolve(null));

      const result = await controller.create(createProductDto);
      expect(result).toEqual(mockProduct);
    });

    it('should throw an error if product already exists', async () => {
      const createProductDto = {
        product_id: '123',
        name: 'Test Product',
        description: 'A test product',
        price: 100.0,
        stock: 10,
      };

      try {
        await controller.create(createProductDto);
      } catch (error) {
        expect(error.message).toEqual('Product with id 123 already exists');
      }
    });
  });

  describe('findAll', () => {
    it('should return all products', async () => {
      const mockProducts = [
        {
          product_id: '123',
          name: 'Test Product',
          description: 'A test product',
          price: 100.0,
          stock: 10,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          product_id: '456',
          name: 'Test Product 2',
          description: 'A test product 2',
          price: 200.0,
          stock: 20,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];
      jest.spyOn(mockModel, 'find').mockResolvedValueOnce(mockProducts);

      const result = await controller.findAll();
      expect(result).toEqual(mockProducts);
    });

    it('should return an empty array if no products found', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a product', async () => {
      const result = await controller.findOne('123');
      expect(result).toEqual(mockProduct);
    });

    it('should throw an error if product not found', async () => {
      jest.spyOn(mockModel, 'findOne').mockImplementationOnce(() => Promise.resolve(null));
      try {
        await controller.findOne('123');
      } catch (error) {
        expect(error.message).toEqual('Product with id 123 not found');
      }
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const result = await controller.update(
        mockProduct.product_id,
        mockProduct,
      );

      expect(result).toEqual(mockProduct);
    });

    it('should throw an error if product not found', async () => {
      jest.spyOn(mockModel, 'findOne').mockImplementationOnce(() => Promise.resolve(null));
      try {
        await controller.update('123', {
          product_id: '123',
          name: 'Test Product',
          description: 'A test product',
          price: 100.0,
          stock: 10,
        });
      } catch (error) {
        expect(error.message).toEqual('Product with id 123 not found');
      }
    });
  });

  describe('delete', () => {
    it('should delete a product', async () => {
      const result = await controller.delete('123');
      expect(result).toBeUndefined();
    });

    it('should throw an error if product not found', async () => {
      jest.spyOn(mockModel, 'findOne').mockImplementationOnce(() => Promise.resolve(null));
      try {
        await controller.delete('123');
      } catch (error) {
        expect(error.message).toEqual('Product with id 123 not found');
      }
    });
  });
});
