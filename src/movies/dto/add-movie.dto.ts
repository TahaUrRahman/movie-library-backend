import { IsNotEmpty, IsString } from "class-validator";

export class AddMovieDto {


    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    director: string;

    @IsString()
    @IsNotEmpty()
    releaseDate: string;

    @IsString()
    @IsNotEmpty()
    genre: string;
}
