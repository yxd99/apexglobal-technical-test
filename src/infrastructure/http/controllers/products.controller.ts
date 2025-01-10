import { Controller, Get, Post, Body, Param, NotFoundException, BadRequestException, Delete, Patch } from '@nestjs/common';
import { Product } from '@domain/entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '@infrastructure/http/dto/product.dto';
import { ProductUseCase } from '@application/use-cases/product.use-case';
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { PostProductCreatedSchema } from '@infrastructure/http/docs/product/created.schema';
import { PatchProductBadRequestSchema, PostProductBadRequestSchema } from '@infrastructure/http/docs/product/bad-request.schema';
import { DeleteProductOkSchema, GetProductFindAllOkSchema, GetProductFindOneOkSchema, PatchProductOkSchema } from '@infrastructure/http/docs/product/ok.schema';
import { ProductFindOneNotFoundSchema } from '@infrastructure/http/docs/product/not-found.schema';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productUseCase: ProductUseCase,
  ) {}

  @ApiBody({ type: CreateProductDto })
  @ApiCreatedResponse(PostProductCreatedSchema)
  @ApiBadRequestResponse(PostProductBadRequestSchema)
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const getProduct = await this.productUseCase.findOne(createProductDto.product_id);
    if (getProduct) {
      throw new BadRequestException(`Product with id ${createProductDto.product_id} already exists`);
    }
    const product = new Product({
      product_id: createProductDto.product_id,
      name: createProductDto.name,
      description: createProductDto.description,
      price: createProductDto.price,
      stock: createProductDto.stock,
      created_at: new Date(),
      updated_at: new Date(),
    });
    return this.productUseCase.create(product);
  }

  @ApiOkResponse(GetProductFindAllOkSchema)
  @Get()
  async findAll() {
    return this.productUseCase.findAll();
  }

  @ApiOkResponse(GetProductFindOneOkSchema)
  @ApiNotFoundResponse(ProductFindOneNotFoundSchema)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productUseCase.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  @ApiOkResponse(PatchProductOkSchema)
  @ApiBadRequestResponse(PatchProductBadRequestSchema)
  @ApiNotFoundResponse(ProductFindOneNotFoundSchema)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    const product = await this.productUseCase.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return this.productUseCase.update(id, updateProductDto);
  }

  @ApiOkResponse(DeleteProductOkSchema)
  @ApiNotFoundResponse(ProductFindOneNotFoundSchema)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const product = await this.productUseCase.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return this.productUseCase.delete(id);
  }
}
