import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsNotEmpty()
  @Field(() => String, { nullable: false })
  email: string;

  @IsNotEmpty()
  @Field(() => String, { nullable: false })
  password: string;
}
