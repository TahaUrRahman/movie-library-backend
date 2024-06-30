import { Review } from 'src/reviews/entities/review.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  director: string;

  @Column()
  releaseDate: string;

  @Column()
  genre: string;

  @OneToMany(() => Review, review => review.movie)
  reviews: Review[];
}
