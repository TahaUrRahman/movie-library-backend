import { PartialType } from '@nestjs/mapped-types';
import { AddMovieDto } from './create-movie.dto';

export class UpdateMovieDto extends PartialType(AddMovieDto) {}
