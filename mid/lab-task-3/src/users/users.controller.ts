
import {
  Controller,
  Post,
  Body,
  ValidationPipe,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto.js';

@Controller('users')
export class UsersController {

  @Post('register')
  register(
    @Body(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
      })
    )
    createUserDto: CreateUserDto
  ) {

    return {
      message: 'User registered successfully',
      user: {
        fullName: createUserDto.fullName,
        email: createUserDto.email,
        age: createUserDto.age,
        accountType: createUserDto.accountType
      }
    };
  }
}
