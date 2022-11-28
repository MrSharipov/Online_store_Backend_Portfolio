import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('products')
export class ProductsController {
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll() {
    return 'Salom dunyo';
  }
}
