import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { LoginUseCase } from '../../usecases/auth/implementations/login.usecase';
import { CustomerUseCase } from '../../usecases/customer/implementations/customer.usecase';
import { VerifyUserUseCase } from '../../usecases/customer/implementations/verify.usecase';
import { CustomerResolver } from 'src/domain/customer/customer.resolver';
import { CustomerService } from 'src/domain/customer/customer.service';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { SignupUseCase } from '../../usecases/auth/implementations/signup.usecase';
import { AuthResolver } from 'src/domain/auth/auth.resolver';
import { AuthService } from 'src/domain/auth/auth.service';
import { AuthModule } from 'src/domain/auth/token.module';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenStrategy } from 'src/domain/auth/strategy/access-token.strategy';
import { RefreshTokenStrategy } from 'src/domain/auth/strategy/refresh-token.strategy';
import { CustomerModule } from 'src/domain/customer/customer.module';
import { RefreshTokenUseCase } from '../../usecases/auth/implementations/refresh-token.usecase';

@Module({
  imports: [AuthModule, CustomerModule],
  controllers: [CustomerController],
  providers: [
    LoginUseCase,
    SignupUseCase,
    CustomerUseCase,
    VerifyUserUseCase,
    RefreshTokenUseCase,
    PrismaService,
    CustomerResolver,
    CustomerService,
    AuthResolver,
    AuthService,
    JwtService,
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy
  ],
})
export class CustomerControllerModule { }