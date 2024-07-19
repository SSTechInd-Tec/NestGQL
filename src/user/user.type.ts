import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field()
  message: string;

  @Field((type) => ID)
  id: number;

  @Field()
  email: string;

  @Field()
  password: string;
}
