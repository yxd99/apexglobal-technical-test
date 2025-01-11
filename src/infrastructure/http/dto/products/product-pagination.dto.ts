import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class ProductPaginationDto {
  @ApiProperty({
    default: 1,
    required: false,
  })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Min(1)
  page: number = 1;

  @ApiProperty({
    default: 15,
    required: false,
  })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @Min(1)
  size: number = 15;
}
