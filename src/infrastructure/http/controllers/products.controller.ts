import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  BadRequestException,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

import { ProductUseCase } from '@application/use-cases/product.use-case';
import { Product } from '@domain/entities/product.entity';
import {
  PatchProductBadRequestSchema,
  PostProductBadRequestSchema,
} from '@infrastructure/http/docs/product/bad-request.schema';
import { PostProductCreatedSchema } from '@infrastructure/http/docs/product/created.schema';
import { ProductFindOneNotFoundSchema } from '@infrastructure/http/docs/product/not-found.schema';
import {
  DeleteProductOkSchema,
  GetProductFindAllOkSchema,
  GetProductFindOneOkSchema,
  PatchProductOkSchema,
} from '@infrastructure/http/docs/product/ok.schema';
import { CreateProductDto } from '@infrastructure/http/dto/products/create-product.dto';
import { ProductPaginationDto } from '@infrastructure/http/dto/products/product-pagination.dto';
import { UpdateProductDto } from '@infrastructure/http/dto/products/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productUseCase: ProductUseCase) {}

  @ApiBody({ type: CreateProductDto })
  @ApiCreatedResponse(PostProductCreatedSchema)
  @ApiBadRequestResponse(PostProductBadRequestSchema)
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    const getProduct = await this.productUseCase.findOne(
      createProductDto.productId,
    );
    if (getProduct) {
      throw new BadRequestException(
        `Product with id ${createProductDto.productId} already exists`,
      );
    }
    const product = new Product({
      productId: createProductDto.productId,
      name: createProductDto.name,
      description: createProductDto.description,
      price: createProductDto.price,
      stock: createProductDto.stock,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return this.productUseCase.create(product);
  }

  @ApiOkResponse(GetProductFindAllOkSchema)
  @Get()
  async findAll(@Query() productPaginationDto: ProductPaginationDto) {
    return this.productUseCase.findAll(productPaginationDto);
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
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
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
