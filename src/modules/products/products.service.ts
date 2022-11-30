import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductsDto, UpdateProductsDto } from './dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const products = await this.prisma.products.findMany({});

    if (!products) throw new ForbiddenException('Product not found');
    return products;
  }

  async getById(userId: string, productId: string) {
    const product = await this.prisma.products.findUnique({
      where: {
        id: productId,
      },
    });
    if (!product) throw new ForbiddenException('Product not found');

    return product;
  }

  async create(userId: string, dto: CreateProductsDto) {
    const user = await this.prisma.products.create({
      data: {
        userId,
        ...dto,
      },
    });
    return user;
  }

  async update(userId: string, productId: string, dto: UpdateProductsDto) {
    const product = await this.prisma.products.findUnique({
      where: {
        id: productId,
      },
    });
    if (!product) throw new ForbiddenException('Product not found');
    if (product.userId !== userId)
      throw new ForbiddenException('You are not owner!!!');
    return this.prisma.products.update({
      where: {
        id: productId,
      },
      data: {
        ...dto,
      },
    });
  }

  async remove(userId: string, productId: string) {
    const product = await this.prisma.products.findUnique({
      where: {
        id: productId,
      },
    });
    if (!product) throw new ForbiddenException('Product not found');
    if (product.userId !== userId)
      throw new ForbiddenException('You are not owner!!!');

    await this.prisma.products.delete({
      where: {
        id: productId,
      },
    });
    return 'Product is successfully deleted!!!';
  }
}
