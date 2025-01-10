import { IsString, IsNumber, IsNotEmpty, IsPositive, Min } from 'class-validator';
import { PartialType } from "@nestjs/swagger";

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  product_id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description?: string;

  @IsNumber()
  @IsPositive()
  @Min(1)
  price: number;

  @IsNumber()
  @IsPositive()
  @Min(1)
  stock: number;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
