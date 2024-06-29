import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    username: string

    @IsString()
    @IsNotEmpty()
    password: string
}
