import { CreateUserInput } from '../dto/create-user.input';
import { AuthResponse } from 'src/domain/auth/dto/auth.dto';

export interface SignupUseCaseInterface {
  execute(data: CreateUserInput): Promise<AuthResponse>;
}
