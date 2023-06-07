import { AuthResponse } from 'src/domain/auth/dto/auth.dto';
import { RefreshTokenInput } from '../dto/refresh-token.input';

export interface RefreshTokenUseCaseInterface {
  execute(data: RefreshTokenInput): Promise<AuthResponse>;
}
