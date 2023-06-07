import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CustomerService } from '../customer/customer.service';
import { compare, genSalt, hash } from 'bcrypt';
import { Customer } from 'src/lib/entities/customer.entity';
import { CreateUserInput } from 'src/application/usecases/auth/dto/create-user.input';
import { AuthResponse } from './dto/auth.dto';
import { LoginUserInput } from 'src/application/usecases/auth/dto/login-user.input';
import { verify } from 'jsonwebtoken';
import { RefreshTokenInput } from 'src/application/usecases/auth/dto/refresh-token.input';

@Injectable()
export class AuthService {

  private readonly accessSecret = this.configService.get<string>('JWT_ACCESS_SECRET');
  private readonly refreshSecret = this.configService.get<string>('JWT_REFRESH_SECRET');
  private readonly salt = this.configService.get<number>('SALT');

  constructor(
    private configService: ConfigService,
    private customerService: CustomerService,
    private jwtService: JwtService,
  ) { }
  async signUp(createUserInput: CreateUserInput): Promise<AuthResponse> {
    const userExists = await this.customerService.findByEmail(
      createUserInput.email,
    );
    if (userExists) throw new BadRequestException('email is already registered');

    const hashedPassword = await this.encript(createUserInput.password);
    const activationCode = this.generateActivationCode();
    createUserInput.password = hashedPassword;

    const newUser = await this.customerService.create(createUserInput, activationCode);
    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateRefreshToken(newUser, tokens.refreshToken);
    return tokens;
  }

  async signIn(loginUserInput: LoginUserInput): Promise<AuthResponse> {
    const user = await this.customerService.findByEmail(loginUserInput.email);
    if (!user)
      throw new BadRequestException('User does not exist');

    const passwordMatches = await compare(loginUserInput.password, user.password);
    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user, tokens.refreshToken);
    return tokens;
  }

  async logout(customer: Customer): Promise<Customer> {
    customer.refreshToken = null;
    return this.customerService.update(customer);
  }

  async updateRefreshToken(customer: Customer, refreshToken: string) {
    customer.refreshToken = refreshToken;
    await this.customerService.update(customer);
  }

  async getTokens(userId: string, username: string): Promise<AuthResponse> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync({ sub: userId, username }, { secret: this.accessSecret, expiresIn: '15m' }),
      this.jwtService.signAsync({ sub: userId, username }, { secret: this.refreshSecret, expiresIn: '7d' }),
    ]);

    return { accessToken, refreshToken };
  }

  async refreshTokens(refreshTokenInput: RefreshTokenInput): Promise<AuthResponse> {
    const { email, refreshToken } = refreshTokenInput;
    const user = await this.customerService.findByEmail(email);
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');

    const refreshTokenMatches = verify(user.refreshToken, this.refreshSecret);
    if (!refreshTokenMatches)
      throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user, tokens.refreshToken);
    return tokens;
  }

  private async encript(data: string): Promise<string> {
    const salt = await genSalt(Number(this.salt));
    const encripted = await hash(data, salt);
    return encripted;
  }

  generateActivationCode(): string {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  }
}
