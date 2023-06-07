import { HttpException, Inject, Injectable } from '@nestjs/common';
import { AuthResolverInterface } from 'src/domain/auth/interfaces/auth.resolver.interface';
import { AuthResponse } from 'src/domain/auth/dto/auth.dto';
import { AuthResolver } from 'src/domain/auth/auth.resolver';
import { RefreshTokenInput } from '../dto/refresh-token.input';
import { RefreshTokenUseCaseInterface } from '../interfaces/refresh-token.usecase.interface';

@Injectable()
export class RefreshTokenUseCase implements RefreshTokenUseCaseInterface {
  constructor(@Inject(AuthResolver) private readonly authResolver: AuthResolverInterface) { }

  async execute(data: RefreshTokenInput): Promise<AuthResponse> {
    try {
      return await this.authResolver.refreshTokens(data);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
