import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { CreateUserInput } from 'src/application/usecases/auth/dto/create-user.input';
import { Customer } from 'src/lib/entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    private prisma: PrismaService
  ) { }

  async create(createUserInput: CreateUserInput, activationCode: string): Promise<Customer> {
    const { email, password } = createUserInput;
    const existingUser = await this.prisma.customer.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error('email is already registered');
    }

    const newUser = await this.prisma.customer.create({
      data: {
        email,
        password,
        activationCode,
        refreshToken: null,
      },
    });
    return newUser;
  }

  async update(customer: Customer): Promise<Customer> {
    const user = await this.prisma.customer.update({
      where: { id: customer.id },
      data: { ...customer },
    });
    return user;
  }

  async findByEmail(email: string): Promise<Customer> {
    return await this.prisma.customer.findFirst({
      where: {
        email
      }
    });
  }

  async findAll() {
    return this.prisma.customer.findMany();
  }
}
