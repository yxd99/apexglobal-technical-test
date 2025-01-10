import { IsString, IsNumber, IsNotEmpty, IsPositive, Min } from 'class-validator';
import { ApiProperty, PartialType } from "@nestjs/swagger";

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
