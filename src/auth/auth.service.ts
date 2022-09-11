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
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const user = await this.userModel.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });
      return {
        ...userData,
        token: this.getJwtToken({ id: user._id }),
      };
    } catch (error) {
      this.handleException(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;
    const user = await this.userModel.findOne({ email: email });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Credentials not valid');
    }
    return {
      ...user,
      token: this.getJwtToken({ id: user._id }),
    };
  }

  async checkAuthStatus(user: User) {
    return {
      ...user,
      token: this.getJwtToken({ id: user._id }),
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
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
