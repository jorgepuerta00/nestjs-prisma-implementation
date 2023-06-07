import { LoginUserInput } from 'src/application/usecases/auth/dto/login-user.input';
import { CreateUserInput } from '../../../application/usecases/auth/dto/create-user.input';
import { AuthResponse } from '../dto/auth.dto';
import { RefreshTokenInput } from 'src/application/usecases/auth/dto/refresh-token.input';

export interface AuthResolverInterface {
  login(data: LoginUserInput): Promise<AuthResponse>;
  signup(data: CreateUserInput): Promise<AuthResponse>;
  refreshTokens(data: RefreshTokenInput): Promise<AuthResponse>;
}
