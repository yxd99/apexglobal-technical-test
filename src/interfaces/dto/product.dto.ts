import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';
import { PartialType } from "@nestjs/swagger";

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  product_id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  price: number;

  @IsNumber()
  stock: number;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
