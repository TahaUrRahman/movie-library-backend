import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  async findByUsername(userName: string){
    const user = await this.userRepository.findOne({
        where: {
          name: userName 
        }
      })
      return user

  }

  async createUser(userName: string , password: string){
    const user = this.userRepository.create({
      active: true,
      name: userName,
      password: password
    })
    console.log('This action signsUp a user' + userName + 'with password: ' +password)
    return this.userRepository.save(user);
  }
  
}
