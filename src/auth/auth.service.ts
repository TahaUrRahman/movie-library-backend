import { ConflictException, ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { LoginDto, SignUpDto } from './dto';
import { UsersService } from '../users/users.service';
import * as argon from 'argon2';
import { QueryFailedError } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { access } from 'fs';

@Injectable()
export class AuthService {

  constructor(private readonly userService: UsersService, private jwt: JwtService, private cfgService: ConfigService) {}

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByUsername(loginDto.username)
    if (user){
      const isEqual = await argon.verify(user.password, loginDto.password)
      if(isEqual){
        return this.signToken(user.id, user.name)
      }
    }
      throw new ForbiddenException('Incorrect email or password!')
  }

  async signUp(signUpDto: SignUpDto){
    const hash = await argon.hash(signUpDto.password)
    try{
      let user = await this.userService.createUser(signUpDto.username, hash)  
      return this.signToken(user.id, user.name)

    }catch(error){
      if (error instanceof QueryFailedError ) {
        const pgError = error as any;
        if (pgError.code === '23505') {
          throw new ConflictException('Username already exists!');
        }
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signToken(userId: number, email: string){
    const payload = {
      sub: userId,
      email
    }

    const token = await this.jwt.signAsync(payload, {
      secret: this.cfgService.get('JWT_SECRET'),
      expiresIn: '30m'
    })

    return {
      access_token: token
    }
  }
}
