import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}
  async register(createUserDto: CreateUserDto) {
    try {
      const user = await this.userModel.create(createUserDto);
      return user;
    } catch (error) {
      this.handleException(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;
    const user = await this.userModel
      .findOne({ email: email })
      .select({ email: 1, password: 1 });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }

  private handleException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Register with data ${JSON.stringify(error.keyValue)} exist`,
      );
    }
    throw new InternalServerErrorException(
      `Can't create User - Check server logs`,
    );
  }
}
