import { ConflictException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { LoginDto, SignUpDto } from './dto';
import { UsersService } from '../users/users.service';
import * as argon from 'argon2';
import { MoreThan, QueryFailedError } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';



@Injectable()
export class AuthService {

  constructor(private readonly userService: UsersService, private jwt: JwtService, private cfgService: ConfigService) {}

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.username)
    if (user){
      const isEqual = await argon.verify(user.password, loginDto.password)
      if(isEqual){
        return this.signToken(user.id, user.email)
      }
    }
      throw new ForbiddenException('Incorrect email or password!')
  }

  async signUp(signUpDto: SignUpDto){
    const hash = await argon.hash(signUpDto.password)
    try{
      let user = await this.userService.createUser(signUpDto.username, hash)  
      return this.signToken(user.id, user.email)

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

  
  async generateResetToken(email: string): Promise<void> {
    const user = await this.userService.findByEmail(email);
    const token = await this.jwt.signAsync({ id: user.id }, { secret: this.cfgService.get('JWT_SECRET'), expiresIn: '1h' });

    user.resetPasswordToken = token;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
    await this.userService.updateUser(user);

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "751dd513f797ea",
        pass: "f00184fe045fab",
      },
    });

    const mailOptions = {
      to: "something@gmail.com",
      from: "751dd513f797ea",
      subject: 'Password Reset',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        http://localhost:3000/reset-password/${token}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };
    try {
      await transporter.sendMail(mailOptions);
    }catch (e){
      console.log(e)
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const decoded = this.jwt.verify(token, {secret: this.cfgService.get('JWT_SECRET')});
    const user = await this.userService.findByUserIdAndResetToken(decoded.id, token, );

    if (!user) {
      throw new NotFoundException('Password reset token is invalid or has expired.');
    }

    user.password = await argon.hash(newPassword);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await this.userService.updateUser(user);
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
