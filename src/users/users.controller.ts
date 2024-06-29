import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
  // private means that it is a class level instance
  constructor(private usersService: UsersService) {}


}