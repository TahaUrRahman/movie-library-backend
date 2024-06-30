import { Review } from "src/reviews/entities/review.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: 'text', unique: true })
    email: string;

    @Column({ type: 'text', nullable: true })
    password: string;

    @Column({ type: 'boolean', default: true })
    active: boolean;

    @Column({ type: 'text', nullable: true })
    resetPasswordToken: string;
  
    @Column({ type: 'timestamptz', nullable: true })
    resetPasswordExpires: Date;

    @OneToMany(() => Review, review => review.user)
    reviews: Review[];
}
