import { IsOptional } from 'class-validator';

export class UpdateProductsDto {
  @IsOptional()
  name: string;
  @IsOptional()
  link: string;
  @IsOptional()
  price: string;
  @IsOptional()
  desc: string;
  @IsOptional()
  categoryId: string;
}
