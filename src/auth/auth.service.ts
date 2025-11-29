import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService) {}

  async login(username: string, password: string) {
    if (
      username !== process.env.HARDCODED_USERNAME ||
      password !== process.env.HARDCODED_PASSWORD
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username };
    return { token: this.jwt.sign(payload) };
  }
}
