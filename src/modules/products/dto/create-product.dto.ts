import { IsNotEmpty } from 'class-validator';

export class CreateProductsDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  link: string;
  @IsNotEmpty()
  price: string;
  @IsNotEmpty()
  desc: string;
  @IsNotEmpty()
  categoryId: string;
}
