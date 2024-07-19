import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/user.entity';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UserType } from './user.type';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Query((returns) => [UserType])
  async users() {
    return await this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Mutation((returns) => UserType)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return await this.userService.create(createUserInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation((returns) => UserType)
  async updateUser(
    @Args('id') id: number,
    @Args('updateUserInput') updateUserInput: CreateUserInput,
  ): Promise<User> {
    return await this.userService.updateUser(id, updateUserInput);
  }

  @UseGuards(JwtAuthGuard)
  @Query((returns) => UserType)
  async getUser(@Args('id') id: number): Promise<UserType> {
    return await this.userService.getOneUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation((returns) => UserType)
  async deleteUser(@Args('id') id: number): Promise<UserType> {
    return await this.userService.deleteUser(id);
  }
}
