import { Injectable, NotFoundException } from '@nestjs/common';
import { AddMovieDto } from './dto/add-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class MoviesService {

  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) { }

  addMovie(movie: AddMovieDto) {
    return this.movieRepository.save(movie);
  }

  findAll() {
    return this.movieRepository.find();
  }

  async findByMovieId(id: number) {
    const movie = await this.movieRepository.findOne({
      where: {
        id: id
      }
    })
    if (movie) {
      return movie;
    } else {
      throw new NotFoundException(`Movie with id: ${id} does not exist`)
    }

  }

  async updateMovie(id: number, updateMovieDto: UpdateMovieDto) {
    const movie = await this.findByMovieId(id);
    Object.assign(movie, updateMovieDto);
    return this.movieRepository.save(movie);
  }

  async deleteMovie(id: number) {
    const result = await this.movieRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
  }

  async deleteAll() {
    await this.movieRepository.clear();
  }
}
