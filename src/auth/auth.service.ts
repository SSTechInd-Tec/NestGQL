import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    // Find user by username and validate password
    const user = await this.userService.findByEmail(username);
    if (user && user.password === password) {
      // In a real application, use hashed passwords and compare them
      return user;
    }
    return null;
  }

  async signin(user: User) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
