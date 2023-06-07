import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CustomerResolverInterface } from '../../../../domain/customer/interfaces/customer.resolver.interface';
import { Customer } from 'src/lib/entities/customer.entity';
import { VerifyUserUseCaseInterface } from '../interfaces/verify.usecase';
import { VerifyUserInput } from '../dto/verify-user.input';
import { CustomerResolver } from 'src/domain/customer/customer.resolver';

@Injectable()
export class VerifyUserUseCase implements VerifyUserUseCaseInterface {
  constructor(@Inject(CustomerResolver) private readonly customerResolver: CustomerResolverInterface) { }

  async execute(data: VerifyUserInput): Promise<Customer> {
    try {
      return await this.customerResolver.verifyAccount(data);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
