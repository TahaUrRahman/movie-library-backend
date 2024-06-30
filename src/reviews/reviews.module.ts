import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesModule } from 'src/movies/movies.module';
import { UsersModule } from 'src/users/users.module';
import { Review } from './entities/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review]), UsersModule, MoviesModule],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
