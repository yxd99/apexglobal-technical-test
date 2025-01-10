import { Controller, Get, Post, Body, Param, NotFoundException, BadRequestException, Put, Delete } from '@nestjs/common';
import { Product } from '@domain/entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '@interfaces/dto/product.dto';
import { ProductUseCase } from '@application/use-cases/product.usecase';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productUseCase: ProductUseCase,
  ) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const getProduct = await this.productUseCase.findOne(createProductDto.product_id);
    if (getProduct) {
      throw new BadRequestException(`Product with id ${createProductDto.product_id} already exists`);
    }
    const product = new Product(
      createProductDto.product_id,
      createProductDto.name,
      createProductDto.description,
      createProductDto.price,
      createProductDto.stock,
      new Date(),
      new Date(),
    );
    return this.productUseCase.create(product);
  }

  @Get()
  async findAll() {
    return this.productUseCase.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productUseCase.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    const product = await this.productUseCase.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return this.productUseCase.update(id, updateProductDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const product = await this.productUseCase.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return this.productUseCase.delete(id);
  }
}
