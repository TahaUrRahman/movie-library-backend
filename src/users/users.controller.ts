import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDto } from 'src/auth/dto';


@Controller('users')
export class UsersController {
  // private means that it is a class level instance
  constructor(private usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.getAllUsers();
  }
 

}