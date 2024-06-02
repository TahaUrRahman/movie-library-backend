import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDto, SignUpDto } from './dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/login')
  logIn(@Body() loginDto: LoginDto) {
    return this.usersService.login(loginDto);
  }

  @Post('/singUp')
  signUp(@Body() signUpnDto: SignUpDto) {
    return this.usersService.signUp(signUpnDto);
  }

}
