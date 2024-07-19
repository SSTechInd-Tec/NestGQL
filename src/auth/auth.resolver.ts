import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { loginResponseType } from './login-response.type';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation((returns) => loginResponseType)
  async signin(
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<loginResponseType> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return this.authService.signin(user);
  }
}
