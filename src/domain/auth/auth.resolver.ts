import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from 'src/application/usecases/auth/dto/create-user.input';
import { Customer } from 'src/lib/entities/customer.entity';
import { AuthService } from './auth.service';
import { AuthResolverInterface } from './interfaces/auth.resolver.interface';
import { AuthResponse } from './dto/auth.dto';
import { LoginUserInput } from 'src/application/usecases/auth/dto/login-user.input';
import { RefreshTokenInput } from 'src/application/usecases/auth/dto/refresh-token.input';

@Resolver(() => Customer)
export class AuthResolver implements AuthResolverInterface {
  constructor(private readonly authService: AuthService) { }
  @Mutation(() => AuthResponse)
  async login(@Args('data') loginUserInput: LoginUserInput): Promise<AuthResponse> {
    return await this.authService.signIn(loginUserInput);
  }

  @Mutation(() => AuthResponse)
  async signup(@Args('data') createUserInput: CreateUserInput): Promise<AuthResponse> {
    return this.authService.signUp(createUserInput);
  }

  @Mutation(() => AuthResponse)
  refreshTokens(@Args('data') refreshTokenInput: RefreshTokenInput): Promise<AuthResponse> {
    return this.authService.refreshTokens(refreshTokenInput);
  }
}
