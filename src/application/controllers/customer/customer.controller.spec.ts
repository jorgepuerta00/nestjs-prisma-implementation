import { CustomerController } from './customer.controller';
import { CreateUserInput } from '../../usecases/auth/dto/create-user.input';
import { Customer } from 'src/lib/entities/customer.entity';
import { LoginUseCase } from '../../usecases/auth/implementations/login.usecase';
import { CustomerUseCase } from '../../usecases/customer/implementations/customer.usecase';
import { VerifyUserUseCase } from '../../usecases/customer/implementations/verify.usecase';
import { createMock } from '@golevelup/ts-jest';
import { VerifyUserInput } from '../../usecases/customer/dto/verify-user.input';
import { LoginUserInput } from '../../usecases/auth/dto/login-user.input';
import { SignupUseCase } from '../../usecases/auth/implementations/signup.usecase';
import { RefreshTokenUseCase } from '../../usecases/auth/implementations/refresh-token.usecase';
import { RefreshTokenInput } from '../../usecases/auth/dto/refresh-token.input';
import { AuthResponse } from 'src/domain/auth/dto/auth.dto';

describe('Customer Controller', () => {
  let customerController: CustomerController;
  let loginUseCase: LoginUseCase;
  let signupUseCase: SignupUseCase;
  let customerUseCase: CustomerUseCase;
  let verifyUseCase: VerifyUserUseCase;
  let refreshTokenUseCase: RefreshTokenUseCase;

  beforeEach(async () => {
    jest.resetAllMocks();
    jest.clearAllMocks();

    loginUseCase = createMock<LoginUseCase>();
    signupUseCase = createMock<SignupUseCase>();
    customerUseCase = createMock<CustomerUseCase>();
    verifyUseCase = createMock<VerifyUserUseCase>();
    refreshTokenUseCase = createMock<RefreshTokenUseCase>();

    customerController = new CustomerController(loginUseCase, signupUseCase, customerUseCase, verifyUseCase, refreshTokenUseCase);
  });

  describe('GIVEN a new user', () => {
    describe('WHEN signup', () => {
      describe('AND email and password are ok', () => {
        it('THEN return a valid customer', async () => {
          const createUserInput: CreateUserInput = {
            email: 'testemail',
            password: 'testpassword',
          };
          const expectedCustomer: Customer = {
            id: '1',
            email: 'testemail',
            activationCode: 'testactivationcode',
            isVerified: false,
            createdAt: undefined,
            updatedAt: undefined
          };

          jest.spyOn(signupUseCase, 'execute').mockResolvedValue(expectedCustomer);

          const result = await customerController.signup(createUserInput);

          expect(result).toEqual(expectedCustomer);
          expect(signupUseCase.execute).toHaveBeenCalledWith(createUserInput);
        });
      });
    });

    describe('WHEN login', () => {
      describe('AND email and password are ok', () => {
        it('THEN return a valid customer', async () => {
          const loginUserInput: LoginUserInput = {
            email: 'testemail',
            password: 'testpassword',
          };
          const expectedCustomer: Customer = {
            id: '1',
            email: 'testemail',
            activationCode: 'testactivationcode',
            isVerified: true,
            createdAt: undefined,
            updatedAt: undefined
          };
          const expectedToken = 'accessToken';
          const expectedResponse = {
            customer: expectedCustomer,
            accessToken: expectedToken,
          };

          jest.spyOn(loginUseCase, 'execute').mockResolvedValue(expectedResponse);

          const result = await customerController.login(loginUserInput);

          expect(result).toEqual(expectedResponse);
          expect(loginUseCase.execute).toHaveBeenCalledWith(loginUserInput);
        });
      });
    });

    describe('WHEN verify', () => {
      describe('AND verification code is correct', () => {
        it('THEN return a valid customer', async () => {
          const verifyUserInput: VerifyUserInput = {
            email: 'testemail',
            activationCode: 'testcode',
          };
          const expectedCustomer: Customer = {
            id: '1',
            email: 'testemail',
            activationCode: 'testactivationcode',
            isVerified: true,
            createdAt: undefined,
            updatedAt: undefined
          };

          jest.spyOn(verifyUseCase, 'execute').mockResolvedValue(expectedCustomer);

          const result = await customerController.verify(verifyUserInput);

          expect(result).toEqual(expectedCustomer);
          expect(verifyUseCase.execute).toHaveBeenCalledWith(verifyUserInput);
        });
      });
    });

    describe('WHEN getCustomer', () => {
      describe('AND customerId is valid', () => {
        it('THEN return a valid customer', async () => {
          const expectedCustomer: Customer = {
            id: '1',
            email: 'testemail',
            activationCode: 'testactivationcode',
            isVerified: true,
            createdAt: undefined,
            updatedAt: undefined
          };

          jest.spyOn(customerUseCase, 'execute').mockResolvedValue([expectedCustomer]);

          const result = await customerController.customers();

          expect(result).toEqual([expectedCustomer]);
          expect(customerUseCase.execute).toHaveBeenCalledWith();
        });
      });
    });

    describe('WHEN refresh token and email are provided', () => {
      describe('AND refreshtoken is valid', () => {
        it('THEN return a valid auth response', async () => {
          const refreshTokenInput: RefreshTokenInput = {
            email: 'testemail',
            refreshToken: 'testrefreshtoken',
          };
          const expectedAuthResponse: AuthResponse = {
            accessToken: 'testaccesstoken',
            refreshToken: 'testrefreshtoken',
          };

          jest.spyOn(refreshTokenUseCase, 'execute').mockResolvedValue(expectedAuthResponse);

          const result = await customerController.refreshTokens(refreshTokenInput);

          expect(result).toEqual(expectedAuthResponse);
          expect(refreshTokenUseCase.execute).toHaveBeenCalledWith(refreshTokenInput);
        });
      });
    });
  });
});
