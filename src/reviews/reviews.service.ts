import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { UsersService } from 'src/users/users.service';
import { MoviesService } from 'src/movies/movies.service';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    private userService: UsersService,
    private moviesService: MoviesService
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const { content, rating, movieId, userId } = createReviewDto;
    const movie = await this.moviesService.findByMovieId(movieId);
    const user = await this.userService.findByUserId(userId);

    if (!movie) {
      throw new NotFoundException(`Movie with ID ${movieId} not found`);
    }

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const review = this.reviewRepository.create({
      content,
      rating,
      movieId,
      userId,
    });

    return this.reviewRepository.save(review);
  }

  findAll(): Promise<Review[]> {
    return this.reviewRepository.find();
  }

  async findOne(id: number): Promise<Review> {
    const review = await this.reviewRepository.findOne({
      where: { id },
    });
    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
    return review;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto): Promise<Review> {
    const review = await this.findOne(id);
    Object.assign(review, updateReviewDto);
    return this.reviewRepository.save(review);
  }

  async delete(id: number): Promise<void> {
    const result = await this.reviewRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
  }

  async deleteAll(): Promise<void> {
    return await this.reviewRepository.clear()
  }
}
