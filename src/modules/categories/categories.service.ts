import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async getAllCategories() {
    const categories = await this.prisma.categories.findMany({
      include: {
        Products: true,
      },
    });

    if (!categories) throw new ForbiddenException('Category not found');
    return categories;
  }

  async getById(userId: string, categoryId: string) {
    const category = await this.prisma.categories.findUnique({
      where: {
        id: categoryId,
      },
    });
    if (!category) throw new ForbiddenException('Category not found');

    return category;
  }

  async create(dto: CreateCategoryDto) {
    const category = await this.prisma.categories.create({
      data: {
        ...dto,
      },
    });
    return category;
  }

  async update(userId: string, categoryId: string, dto: UpdateCategoryDto) {
    const category = await this.prisma.categories.findUnique({
      where: {
        id: categoryId,
      },
    });
    // if (!category) throw new ForbiddenException('Category not found');
    return this.prisma.categories.update({
      where: {
        id: categoryId,
      },
      data: {
        ...dto,
      },
    });
  }

  async remove(userId: string, categoryId: string) {
    const category = await this.prisma.categories.findUnique({
      where: {
        id: categoryId,
      },
    });
    // if (!category) throw new ForbiddenException('Category not found');
    await this.prisma.categories.delete({
      where: {
        id: categoryId,
      },
    });
    return 'Category is successfully deleted!!!';
  }
}
