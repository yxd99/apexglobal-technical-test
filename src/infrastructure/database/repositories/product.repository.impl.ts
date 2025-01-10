import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '@domain/entities/product.entity';
import { ProductRepository } from '@domain/repositories/product.repository';
import { ProductDocument } from '@infrastructure/database/models/product.model';
import { ProductPaginationDto } from '@infrastructure/http/dto/product.dto';

@Injectable()
export class ProductRepositoryImpl implements ProductRepository {
  constructor(@InjectModel('Product') private readonly productModel: Model<ProductDocument>) {}

  async create(product: Product): Promise<Product> {
    const createdProduct = new this.productModel(product);
    const savedProduct = await createdProduct.save();
    return this.toEntity(savedProduct);
  }

  async findAll(productPaginationDto:  ProductPaginationDto): Promise<Product[]> {
    const { page, size } = productPaginationDto;
    const products = await this.productModel.find({ is_deleted: false }).skip((page - 1) * size).limit(size);
    return products.map(this.toEntity);
  }

  async findOne(productId: string): Promise<Product | null> {
    const product = await this.productModel.findOne({ product_id: productId, is_deleted: false });
    return product ? this.toEntity(product) : null;
  }

  async update(productId: string, product: Partial<Product>): Promise<Product | null> {
    const updatedProduct = await this.productModel
      .findOneAndUpdate({ product_id: productId }, product, { new: true })
      ;
    return updatedProduct ? this.toEntity(updatedProduct) : null;
  }

  async delete(productId: string): Promise<void> {
    await this.productModel.findOneAndUpdate({ product_id: productId }, { is_deleted: true });
  }

  private toEntity(doc: ProductDocument): Product {
    return new Product({
      product_id: doc.product_id,
      name: doc.name,
      description: doc.description,
      price: doc.price,
      stock: doc.stock,
      created_at: doc.created_at,
      updated_at: doc.updated_at,
    });
  }
}
