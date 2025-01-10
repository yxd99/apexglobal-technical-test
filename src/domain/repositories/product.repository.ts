import { Product } from '@domain/entities/product.entity';

export interface ProductRepository {
  create(product: Product): Promise<Product>;
  findAll(): Promise<Product[]>;
  findOne(productId: string): Promise<Product | null>;
  update(productId: string, product: Partial<Product>): Promise<Product | null>;
  delete(productId: string): Promise<void>;
}
