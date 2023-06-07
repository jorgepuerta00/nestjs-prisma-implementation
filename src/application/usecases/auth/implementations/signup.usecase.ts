import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { SignupUseCaseInterface } from '../interfaces/signup.usecase.interface';
import { CreateUserInput } from '../dto/create-user.input';
import { AuthResolverInterface } from 'src/domain/auth/interfaces/auth.resolver.interface';
import { AuthResponse } from 'src/domain/auth/dto/auth.dto';
import { AuthResolver } from 'src/domain/auth/auth.resolver';

@Injectable()
export class SignupUseCase implements SignupUseCaseInterface {
  constructor(@Inject(AuthResolver) private readonly authResolver: AuthResolverInterface) { }

  async execute(data: CreateUserInput): Promise<AuthResponse> {
    try {
      return await this.authResolver.signup(data);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
