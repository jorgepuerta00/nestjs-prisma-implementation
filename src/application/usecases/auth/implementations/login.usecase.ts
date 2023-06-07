import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { LoginUserInput } from '../dto/login-user.input';
import { LoginUseCaseInterface } from '../interfaces/login.usecase.interface';
import { AuthResolverInterface } from 'src/domain/auth/interfaces/auth.resolver.interface';
import { AuthResponse } from 'src/domain/auth/dto/auth.dto';
import { AuthResolver } from 'src/domain/auth/auth.resolver';

@Injectable()
export class LoginUseCase implements LoginUseCaseInterface {
  constructor(@Inject(AuthResolver) private readonly authResolver: AuthResolverInterface) { }

  async execute(data: LoginUserInput): Promise<AuthResponse> {
    try {
      return await this.authResolver.login(data);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
