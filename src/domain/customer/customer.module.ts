import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { CustomerResolver } from './customer.resolver';

@Module({
  imports: [],
  controllers: [],
  providers: [
    PrismaService,
    CustomerService,
    CustomerResolver,
  ],
})
export class CustomerModule { }
