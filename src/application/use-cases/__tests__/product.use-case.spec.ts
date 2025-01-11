import { ProductUseCase } from '@application/use-cases/product.use-case';
import { Product } from '@domain/entities/product.entity';
import { productRepositoryMock } from '@domain/repositories/__mocks__/product.repository.mock';
import { ProductPaginationDto } from '@infrastructure/http/dto/products/product.dto';

describe('ProductUseCase', () => {
  let productUseCase: ProductUseCase;
  let pagination: ProductPaginationDto;
  let mockProducts: Product[];
  let mockProduct: Product;

  beforeEach(() => {
    productUseCase = new ProductUseCase(productRepositoryMock);
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
  });

  describe('create', () => {
    it('should create a product successfully', async () => {
      productRepositoryMock.create.mockResolvedValue(mockProduct);

      const result = await productUseCase.create(mockProduct);

      expect(result).toEqual(mockProduct);
      expect(productRepositoryMock.create).toHaveBeenCalledWith(mockProduct);
    });

    it('should throw an error if product already exists', async () => {
      jest
        .spyOn(productRepositoryMock, 'findOne')
        .mockRejectedValue(mockProduct);

      try {
        await productUseCase.create(mockProduct);
      } catch (error) {
        expect(error.message).toEqual(
          `Product with id ${mockProduct.product_id} already exists`,
        );
      }
      expect(productRepositoryMock.create).toHaveBeenCalledWith(mockProduct);
    });
  });

  describe('findAll', () => {
    it('should return all products', async () => {
      jest
        .spyOn(productRepositoryMock, 'findAll')
        .mockResolvedValue(mockProducts);

      const result = await productUseCase.findAll({
        page: 1,
        size: 10,
      });
      expect(result).toEqual(mockProducts);
    });

    it('should return empty array if no products found', async () => {
      jest.spyOn(productRepositoryMock, 'findAll').mockResolvedValue([]);
      const result = await productUseCase.findAll(pagination);
      expect(result).toEqual([]);
    });

    it('should return an empty array if pagination is invalid', async () => {
      jest.spyOn(productRepositoryMock, 'findAll').mockResolvedValue([]);
      const result = await productUseCase.findAll({
        page: 0,
        size: 0,
      });
      expect(result).toEqual([]);
    });

    it('should return the page 3 of the products', async () => {
      jest
        .spyOn(productRepositoryMock, 'findAll')
        .mockResolvedValue(mockProducts.slice(20, 30));
      const result = await productUseCase.findAll({
        page: 3,
        size: 10,
      });
      expect(result).toEqual(mockProducts.slice(20, 30));
    });

    it('should return only the first 5 products', async () => {
      jest
        .spyOn(productRepositoryMock, 'findAll')
        .mockResolvedValue(mockProducts.slice(0, 5));
      const result = await productUseCase.findAll({
        page: 1,
        size: 5,
      });
      expect(result).toEqual(mockProducts.slice(0, 5));
    });
  });

  describe('findOne', () => {
    it('should return a product', async () => {
      jest
        .spyOn(productRepositoryMock, 'findOne')
        .mockResolvedValue(mockProduct);
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
      jest
        .spyOn(productRepositoryMock, 'update')
        .mockResolvedValue(mockProduct);
      const result = await productUseCase.update(
        mockProduct.product_id,
        mockProduct,
      );
      expect(result).toEqual(mockProduct);
    });

    it('should return null if product not found', async () => {
      jest.spyOn(productRepositoryMock, 'update').mockResolvedValue(null);
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
      jest.spyOn(productRepositoryMock, 'delete').mockResolvedValue(undefined);
      await productUseCase.delete('123');
      expect(productRepositoryMock.delete).toHaveBeenCalledWith('123');
    });

    it('should return null if product not found', async () => {
      jest.spyOn(productRepositoryMock, 'delete').mockResolvedValue(null);
      const result = await productUseCase.delete('123');
      expect(result).toBeNull();
    });
  });
});
