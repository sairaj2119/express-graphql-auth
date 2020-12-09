import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert,
} from 'typeorm';
import bcrypt from 'bcryptjs';
import { IsEmail, Length } from 'class-validator';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Length(3, 50, { message: 'Username must be at least 3 characters long' })
  @Column({ unique: true })
  username: string;

  @IsEmail({}, { message: 'Invalid email adress' })
  @Column({ unique: true })
  email: string;

  @Length(6, 255)
  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }
}
