import { PartialType } from '@nestjs/mapped-types';
import { AddMovieDto } from './add-movie.dto';

export class UpdateMovieDto extends PartialType(AddMovieDto) {}
