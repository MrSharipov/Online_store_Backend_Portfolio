import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorator';
import { CreateProductsDto, UpdateProductsDto } from './dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('all')
  getAll(@GetUser('id') id: string) {
    return this.productsService.getAll(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getById(@Param('id') productId: string, @GetUser('id') userId: string) {
    return this.productsService.getById(userId, productId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() dto: CreateProductsDto, @GetUser('id') userId: string) {
    return this.productsService.create(userId, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(
    @Param('id') productId: string,
    @Body() dto: UpdateProductsDto,
    @GetUser('id') userId: string,
  ) {
    return this.productsService.update(userId, productId, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') productId, @GetUser('id') userId: string) {
    return this.productsService.remove(userId, productId);
  }
}
