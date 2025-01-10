import { Product } from '@domain/entities/product.entity';
import { ProductPaginationDto } from '@infrastructure/http/dto/product.dto';

export interface ProductRepository {
  create(product: Product): Promise<Product>;
  findAll(productPaginationDto:  ProductPaginationDto): Promise<Product[]>;
  findOne(productId: string): Promise<Product | null>;
  update(productId: string, product: Partial<Product>): Promise<Product | null>;
  delete(productId: string): Promise<void>;
}
