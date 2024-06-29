import { Injectable } from '@nestjs/common';
import { AddMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  addMovie(createMovieDto: AddMovieDto) {
    return 'This action adds a new movie';
  }

  findAll() {
    return `This action returns all movies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} movie`;
  }

  updateMovie(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  deleteMovie(id: number) {
    return `This action removes a #${id} movie`;
  }
}
