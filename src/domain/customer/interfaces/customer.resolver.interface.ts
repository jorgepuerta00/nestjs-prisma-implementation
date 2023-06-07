import { Customer } from 'src/lib/entities/customer.entity';
import { VerifyUserInput } from 'src/application/usecases/customer/dto/verify-user.input';

export interface CustomerResolverInterface {
  customers(): Promise<Customer[]>;
  verifyAccount(data: VerifyUserInput): Promise<Customer>;
}
