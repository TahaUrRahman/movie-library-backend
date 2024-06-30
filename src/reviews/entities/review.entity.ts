import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Movie } from '../../movies/entities/movie.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @Column('int')
  rating: number;

  @Column()
  movieId: number;

  @Column()
  userId: number;

  @ManyToOne(() => Movie, movie => movie.reviews)
  @JoinColumn({ name: 'movieId' })
  movie: Movie;

  @ManyToOne(() => User, user => user.reviews)
  @JoinColumn({ name: 'userId' })
  user: User;
}
