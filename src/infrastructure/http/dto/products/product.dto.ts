import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

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
