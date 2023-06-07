import { LoginUserInput } from "../dto/login-user.input";
import { AuthResponse } from "src/domain/auth/dto/auth.dto";

export interface LoginUseCaseInterface {
  execute(data: LoginUserInput): Promise<AuthResponse>;
}