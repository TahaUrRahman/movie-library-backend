import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { AddMovieDto } from './dto/add-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  addMovie(@Body() addMovieDto: AddMovieDto) {   
    return this.moviesService.addMovie(addMovieDto);
  }

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findByMovieId(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.updateMovie(+id, updateMovieDto);
  }

  @Delete(':id')
  deleteMovie(@Param('id') id: string) {
    return this.moviesService.deleteMovie(+id);
  }

  @Delete('')
  deleteAll() {
    return this.moviesService.deleteAll();
  }
}
