import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignUpDto } from './dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @HttpCode(HttpStatus.OK)
  @Post('/login')
  logIn(@Body() loginDto: LoginDto) {
    console.log({loginDto,})
    return this.authService.login(loginDto);
  }

  @Post('/signup')
  signUp(@Body() signUpnDto: SignUpDto) {
    return this.authService.signUp(signUpnDto);
  }

  @Get('forgot-password')
  generateResetToken(@Body() loginDto: LoginDto){
    return this.authService.generateResetToken(loginDto.username);
  }

  @Post('reset-password/:token')
  async resetPassword(@Param('token') token: string, @Body('password') password: string) {
    await this.authService.resetPassword(token, password);
  }
}
