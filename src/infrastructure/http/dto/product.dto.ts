import { IsString, IsNumber, IsNotEmpty, IsPositive, Min, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Type } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  product_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @Min(1)
  price: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @Min(1)
  stock: number;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class ProductPaginationDto {
  @ApiProperty({
    default: 1,
    required: false,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  page: number = 1;

  @ApiProperty({
    default: 15,
    required: false,
  })
  @IsNumber()
  @IsPositive()
  @Min(1)
  @Type(() => Number)
  size: number = 15;
}