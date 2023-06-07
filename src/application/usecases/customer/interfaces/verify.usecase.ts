import { Customer } from 'src/lib/entities/customer.entity';
import { VerifyUserInput } from '../dto/verify-user.input';

export interface VerifyUserUseCaseInterface {
  execute(data: VerifyUserInput): Promise<Customer>;
}
