import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';



@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email: email
      }
    })
    return user
  }

  async findByUserId(userId: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId
      }
    })
    return user
  }

  async findByUserIdAndResetToken(id: number, token: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id, resetPasswordToken: token, resetPasswordExpires: MoreThan(new Date()) },
    });
    return user;
  }

  getAllUsers() {
    return this.userRepository.find()
  }

  async createUser(userName: string, password: string) {
    const user = this.userRepository.create({
      active: true,
      email: userName,
      password: password
    })
    return this.userRepository.save(user);
  }

  async updateUser(user: User) {
    return this.userRepository.save(user);
  }

}
