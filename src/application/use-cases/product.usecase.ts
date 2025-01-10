import { UpdateProductDto } from "@interfaces/dto/product.dto";
import { Product } from "@domain/entities/product.entity";
import { ProductRepository } from "@domain/repositories/product.repository";
import { Inject } from "@nestjs/common";

export class ProductUseCase {
  constructor(
    @Inject("ProductRepository") private readonly productRepository: ProductRepository
  ) {}

  async create(product: Product): Promise<Product> {
    return this.productRepository.create(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  async findOne(productId: string): Promise<Product | null> {
    return this.productRepository.findOne(productId);
  }

  async update(productId: string, product: UpdateProductDto): Promise<Product | null> {
    return this.productRepository.update(productId, product);
  }

  async delete(productId: string): Promise<void> {
    return this.productRepository.delete(productId);
  }
}