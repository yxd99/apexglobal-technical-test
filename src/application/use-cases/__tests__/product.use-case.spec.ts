import { ProductUseCase } from "@application/use-cases/product.use-case";
import { Product } from "@domain/entities/product.entity";
import { productRepositoryMock } from "@domain/repositories/__mocks__/product.repository.mock";

describe('ProductUseCase', () => {

  let productUseCase: ProductUseCase;

  beforeEach(() => {
    productUseCase = new ProductUseCase(productRepositoryMock);
  });

  describe('create', () => {
    it('should create a product successfully', async () => {
      const mockProduct: Product = {
        product_id: '123',
        name: 'Test Product',
        description: 'A test product',
        price: 100.0,
        stock: 10,
        created_at: new Date(),
        updated_at: new Date(),
      };
  
      productRepositoryMock.create.mockResolvedValue(mockProduct);
  
      const result = await productUseCase.create(mockProduct);
  
      expect(result).toEqual(mockProduct);
      expect(productRepositoryMock.create).toHaveBeenCalledWith(mockProduct);
    });

    it('should throw an error if product already exists', async () => {
      const mockProduct: Product = {
        product_id: '123',
        name: 'Test Product',
        description: 'A test product',
        price: 100.0,
        stock: 10,
        created_at: new Date(),
        updated_at: new Date(),
      };

      productRepositoryMock.create.mockRejectedValue(new Error('Product with id 123 already exists'));

      try{
        await productUseCase.create(mockProduct);
      } catch (error) {
        expect(error.message).toEqual('Product with id 123 already exists');
      }
      expect(productRepositoryMock.create).toHaveBeenCalledWith(mockProduct);
    });
  });

  describe('findAll', () => {
    it('should return all products', async () => {
      const mockProducts: Product[] = [
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
        }
      ];

      productRepositoryMock.findAll.mockResolvedValue(mockProducts);

      const result = await productUseCase.findAll();
      expect(result).toEqual(mockProducts);
    });
  });

  describe('findOne', () => {
    it('should return a product', async () => {
      const mockProduct: Product = {
        product_id: '121',
        name: 'Test Product',
        description: 'A test product',
        price: 100.0,
        stock: 10,
        created_at: new Date(),
        updated_at: new Date(),
      };

      productRepositoryMock.findOne.mockResolvedValue(mockProduct);

      const result = await productUseCase.findOne(mockProduct.product_id);
      expect(result).toEqual(mockProduct);
    });

    it('should return null if product not found', async () => {
      productRepositoryMock.findOne.mockResolvedValue(null);

      const result = await productUseCase.findOne('123');
      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const mockProduct: Product = {
        product_id: '123',
        name: 'Test Product',
        description: 'A test product',
        price: 100.0,
        stock: 10,
        created_at: new Date(),
        updated_at: new Date(),
      };

      productRepositoryMock.update.mockResolvedValue(mockProduct);

      const result = await productUseCase.update(mockProduct.product_id, mockProduct);
      expect(result).toEqual(mockProduct);
    });

    it('should return null if product not found', async () => {
      productRepositoryMock.update.mockResolvedValue(null);

      const result = await productUseCase.update('123', {
        product_id: '123',
        name: 'Test Product',
        description: 'A test product',
        price: 100.0,
        stock: 10,
      });
      expect(result).toBeNull();
    });
  });

  describe('delete', () => {
    it('should delete a product', async () => {
      productRepositoryMock.delete.mockResolvedValue(undefined);

      await productUseCase.delete('123');
      expect(productRepositoryMock.delete).toHaveBeenCalledWith('123');
    });

    it('should return null if product not found', async () => {
      productRepositoryMock.delete.mockResolvedValue(null);

      const result = await productUseCase.delete('123');
      expect(result).toBeNull();
    });
  });
});
