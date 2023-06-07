import { Body, Controller, Get, Post, Inject, UseGuards } from '@nestjs/common';
import { SignupUseCaseInterface } from '../../usecases/auth/interfaces/signup.usecase.interface';
import { CreateUserInput } from '../../usecases/auth/dto/create-user.input';
import { CustomerUseCaseInterface } from '../../usecases/customer/interfaces/customer.usecase.interface';
import { VerifyUserInput } from '../../usecases/customer/dto/verify-user.input';
import { VerifyUserUseCaseInterface } from '../../usecases/customer/interfaces/verify.usecase';
import { CustomerUseCase } from '../../usecases/customer/implementations/customer.usecase';
import { LoginUseCase } from '../../usecases/auth/implementations/login.usecase';
import { VerifyUserUseCase } from '../../usecases/customer/implementations/verify.usecase';
import { LoginUserInput } from '../../usecases/auth/dto/login-user.input';
import { LoginUseCaseInterface } from '../../usecases/auth/interfaces/login.usecase.interface';
import { SignupUseCase } from '../../usecases/auth/implementations/signup.usecase';
import { AccessTokenGuard } from 'src/utils/guards/access-token.guard';
import { RefreshTokenInput } from '../../usecases/auth/dto/refresh-token.input';
import { RefreshTokenGuard } from 'src/utils/guards/refresh-token.guard';
import { RefreshTokenUseCase } from '../../usecases/auth/implementations/refresh-token.usecase';
import { RefreshTokenUseCaseInterface } from '../../usecases/auth/interfaces/refresh-token.usecase.interface';

@Controller('customer')
export class CustomerController {
  constructor(
    @Inject(LoginUseCase) private readonly loginUseCase: LoginUseCaseInterface,
    @Inject(SignupUseCase) private readonly signupUseCase: SignupUseCaseInterface,
    @Inject(CustomerUseCase) private readonly customerUseCase: CustomerUseCaseInterface,
    @Inject(VerifyUserUseCase) private readonly verifyUseCase: VerifyUserUseCaseInterface,
    @Inject(RefreshTokenUseCase) private readonly refreshTokenUseCase: RefreshTokenUseCaseInterface,
  ) { }

  @Post('/login')
  async login(@Body() loginInput: LoginUserInput) {
    return await this.loginUseCase.execute(loginInput);
  }

  @Post('/signup')
  async signup(@Body() createUserInput: CreateUserInput) {
    return await this.signupUseCase.execute(createUserInput);
  }

  @Post('/verify')
  async verify(@Body() verifyUserInput: VerifyUserInput) {
    return await this.verifyUseCase.execute(verifyUserInput);
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  async customers() {
    return await this.customerUseCase.execute();
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Body() refreshTokenInput: RefreshTokenInput) {
    return this.refreshTokenUseCase.execute(refreshTokenInput);
  }
}
