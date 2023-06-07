import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CustomerService } from './customer.service';
import { CustomerResolverInterface } from 'src/domain/customer/interfaces/customer.resolver.interface';
import { Customer } from 'src/lib/entities/customer.entity';
import { VerifyUserInput } from 'src/application/usecases/customer/dto/verify-user.input';
import { HttpException, HttpStatus } from '@nestjs/common';

@Resolver(() => Customer)
export class CustomerResolver implements CustomerResolverInterface {
  constructor(private readonly customerService: CustomerService) { }

  @Query(() => [Customer])
  async customers(): Promise<Customer[]> {
    return this.customerService.findAll();
  }

  @Mutation(() => Customer)
  async verifyAccount(@Args('data') data: VerifyUserInput): Promise<Customer> {
    const { email, activationCode } = data;
    const customer = await this.customerService.findByEmail(email);

    if (customer && customer.isVerified) {
      throw new Error('email is already verified');
    }
    else if (!customer || customer.activationCode !== activationCode) {
      throw new HttpException('email doesnt match with the activation code', HttpStatus.BAD_REQUEST);
    }

    customer.isVerified = true;
    return await this.customerService.update(customer);
  }
}
