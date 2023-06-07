import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategy/access-token.strategy';
import { AuthService } from './auth.service';
import { RefreshTokenStrategy } from './strategy/refresh-token.strategy';
import { CustomerService } from '../customer/customer.service';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { CustomerResolver } from '../customer/customer.resolver';

@Module({
  imports: [JwtModule.register({})],
  controllers: [

  ],
  providers: [
    JwtService,
    AuthService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    CustomerService,
    PrismaService,
    CustomerService,
    CustomerResolver,
  ],
})
export class AuthModule { }
