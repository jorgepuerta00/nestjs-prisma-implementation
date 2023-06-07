import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CustomerResolverInterface } from '../../../../domain/customer/interfaces/customer.resolver.interface';
import { CustomerUseCaseInterface } from '../interfaces/customer.usecase.interface';
import { CustomerResolver } from 'src/domain/customer/customer.resolver';

@Injectable()
export class CustomerUseCase implements CustomerUseCaseInterface {
  constructor(@Inject(CustomerResolver) private readonly customerResolver: CustomerResolverInterface) { }

  async execute() {
    try {
      return await this.customerResolver.customers();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
