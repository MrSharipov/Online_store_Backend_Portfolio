import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto, CreateUserDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}
  async signup(dto: CreateUserDto) {
    const hash = await argon2.hash(dto.password);
    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        hash,
      },
    });
    if (!user) throw new ForbiddenException("User can't be created");
    return this.getToken(user.id, user.email, user.name);
  }
  async signIn(dto: AuthDto) {
    // find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    // if user does not exist throw exception
    if (!user) throw new ForbiddenException('Credentials incorrect');

    // compare password
    const pwMatches = await argon2.verify(user.hash, dto.password);
    // if password incorrect throw exception
    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');
    return this.getToken(user.id, user.email, user.name);
  }

  getToken = async (userId: number, email: string, name: string) => {
    const payload = {
      sub: userId,
      email,
      name,
    };
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '10m',
      secret: 'jwt_super_secret',
    });
    return {
      access_token: token,
    };
  };
}
