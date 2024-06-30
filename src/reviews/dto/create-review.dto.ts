import { IsString, IsInt, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsInt()
  @Min(1)
  @Max(10)
  rating: number;

  @IsInt()
  @IsNotEmpty()
  movieId: number;

  @IsInt()
  @IsNotEmpty()
  userId: number;
}
