import { Injectable } from '@nestjs/common';
import { UsersService } from '../http/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../http/users/entities/user.entity';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(username);
    if (user && bcrypt.compareSync(pass, user.password_hash)) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = {
      username: user.name,
      userrole: user.role.name,
      sub: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '120m' }),
    };
  }
}
