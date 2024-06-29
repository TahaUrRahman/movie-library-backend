import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignUpDto } from './dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('/login')
  logIn(@Body() loginDto: LoginDto) {
    console.log({loginDto,})
    return this.authService.login(loginDto);
  }

  @Post('/signup')
  signUp(@Body() signUpnDto: SignUpDto) {
    return this.authService.signUp(signUpnDto);
  }
}
