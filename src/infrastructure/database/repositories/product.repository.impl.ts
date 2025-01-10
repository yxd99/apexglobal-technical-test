import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '@domain/entities/product.entity';
import { ProductRepository } from '@domain/repositories/product.repository';
import { ProductDocument } from '@infrastructure/database/models/product.model';

@Injectable()
export class ProductRepositoryImpl implements ProductRepository {
  constructor(@InjectModel('Product') private readonly productModel: Model<ProductDocument>) {}

  async create(product: Product): Promise<Product> {
    const createdProduct = new this.productModel(product);
    const savedProduct = await createdProduct.save();
    return this.toEntity(savedProduct);
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productModel.find({ is_deleted: false }).exec();
    return products.map(this.toEntity);
  }

  async findOne(productId: string): Promise<Product | null> {
    const product = await this.productModel.findOne({ product_id: productId, is_deleted: false }).exec();
    return product ? this.toEntity(product) : null;
  }

  async update(productId: string, product: Partial<Product>): Promise<Product | null> {
    const updatedProduct = await this.productModel
      .findOneAndUpdate({ product_id: productId }, product, { new: true })
      .exec();
    return updatedProduct ? this.toEntity(updatedProduct) : null;
  }

  async delete(productId: string): Promise<void> {
    await this.productModel.updateOne({ product_id: productId }, { is_deleted: true }).exec();
  }

  private toEntity(doc: ProductDocument): Product {
    return new Product(
      doc.product_id,
      doc.name,
      doc.description,
      doc.price,
      doc.stock,
      doc.created_at,
      doc.updated_at,
    );
  }
}
