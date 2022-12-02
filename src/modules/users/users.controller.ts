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
import { UpdateUserDto } from './dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('all')
  getAll() {
    return this.usersService.getAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getById(@GetUser('id') userId: string) {
    return this.usersService.getById(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  update(@GetUser('id') userId: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(userId, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') userId) {
    return this.usersService.remove(userId);
  }
}
