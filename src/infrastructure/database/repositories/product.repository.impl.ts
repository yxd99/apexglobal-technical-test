import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from '@domain/entities/product.entity';
import { ProductRepository } from '@domain/repositories/product.repository';
import { ProductDocument } from '@infrastructure/database/models/product.model';
import { ProductPaginationDto } from '@infrastructure/http/dto/products/product-pagination.dto';

@Injectable()
export class ProductRepositoryImpl implements ProductRepository {
  constructor(
    @InjectModel('Product')
    private readonly ProductModel: Model<ProductDocument>,
  ) {}

  async create(product: Product): Promise<Product> {
    const createdProduct = new this.ProductModel(product);
    const savedProduct = await createdProduct.save();
    return this.toEntity(savedProduct);
  }

  async findAll(
    productPaginationDto: ProductPaginationDto,
  ): Promise<Product[]> {
    const { page, size } = productPaginationDto;
    const products = await this.ProductModel.find({ is_deleted: false })
      .skip((page - 1) * size)
      .limit(size)
      .exec();
    return products.map(this.toEntity);
  }

  async findOne(productId: string): Promise<Product | null> {
    const product = await this.ProductModel.findOne({
      productId: productId,
      is_deleted: false,
    });
    return product ? this.toEntity(product) : null;
  }

  async update(
    productId: string,
    product: Partial<Product>,
  ): Promise<Product | null> {
    const updatedProduct = await this.ProductModel.findOneAndUpdate(
      { productId: productId },
      product,
      { new: true },
    );
    return this.toEntity(updatedProduct);
  }

  async delete(productId: string): Promise<void> {
    await this.ProductModel.findOneAndUpdate(
      { productId: productId },
      { is_deleted: true },
    );
  }

  private toEntity(doc: ProductDocument): Product {
    return new Product({
      productId: doc.productId,
      name: doc.name,
      description: doc.description,
      price: doc.price,
      stock: doc.stock,
      createdAt: doc.created_at,
      updatedAt: doc.updated_at,
    });
  }
}
