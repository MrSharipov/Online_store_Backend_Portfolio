import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorator';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  // @UseGuards(AuthGuard('jwt'))
  @Get('all')
  getAll() {
    return this.categoriesService.getAllCategories();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getById(@Param('id') categoryId: string, @GetUser('id') userId: string) {
    return this.categoriesService.getById(userId, categoryId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() dto: CreateCategoryDto) {
    return this.categoriesService.create(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(
    @Param('id') categoryId: string,
    @Body() dto: UpdateCategoryDto,
    @GetUser('id') userId: string,
  ) {
    return this.categoriesService.update(userId, categoryId, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') categoryId: string, @GetUser('id') userId: string) {
    return this.categoriesService.remove(userId, categoryId);
  }
}
