import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const users = await this.prisma.user.findMany({});

    if (!users) throw new ForbiddenException('Product not found');
    return users;
  }

  async getById(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) throw new ForbiddenException('User not found');

    return user;
  }

  async update(userId: string, dto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) throw new ForbiddenException('User not found');
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });
  }

  async remove(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) throw new ForbiddenException('User not found');

    await this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
    return 'User is successfully deleted!!!';
  }
}
