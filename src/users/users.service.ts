import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>){}
  
  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: {
        name: loginDto.username
      }
    })
    if (user){
      console.log('user fetched with name: ' + user.name)
      console.log('This action loginsIn a user: ' + loginDto.username + 'with password: ' + loginDto.password)
    }
    return user;
  }

  signUp(signUpDto: SignUpDto){
    const user = this.userRepository.create({
      active: true,
      name: signUpDto.username,
      password: signUpDto.password
    })
    console.log('This action signsUp a user' + signUpDto.username + 'with password: ' + signUpDto.password)
    return this.userRepository.save(user);
  }
}
