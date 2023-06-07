import { Field, ObjectType } from '@nestjs/graphql';
import { Base } from './base.entity';

@ObjectType()
export class Customer extends Base {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password?: string;

  @Field(() => String)
  refreshToken?: string;

  @Field(() => String)
  activationCode?: string;

  @Field(() => Boolean)
  isVerified?: boolean;
}
