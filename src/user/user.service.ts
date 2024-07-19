import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UserType } from './user.type';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    const user = this.usersRepository.create(createUserInput);
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async updateUser(
    id: number,
    updatedUser: CreateUserInput,
  ): Promise<UserType> {
    const user = await this.usersRepository.findOne({
      where: { id: id },
    });
    if (!user) {
      throw new Error('User not found');
    }
    this.usersRepository.update(user, updatedUser);
    await this.usersRepository.save(user);
    const d = await this.usersRepository.findOne({
      where: { id: id },
    });
    return { message: 'successfully update a user', id, ...updatedUser };
  }

  async getOneUser(id: number): Promise<UserType> {
    const user = await this.usersRepository.findOne({
      where: { id: id },
    });
    if (!user) {
      throw new Error('User not found');
    }
    return { message: 'successfully get one user', id, ...user };
  }

  async deleteUser(id: number): Promise<UserType> {
    const user = await this.usersRepository.findOne({
      where: { id: id },
    });
    if (!user) {
      throw new NotFoundException('User not found', {
        cause: 'User not found',
      });
    }
    this.usersRepository.delete(user);
    return { message: 'successfully delete one user', id, ...user };
  }

  async findByEmail(email: string): Promise<UserType> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return { message: 'Successfully get user by email', id: user.id, ...user };
  }
}
