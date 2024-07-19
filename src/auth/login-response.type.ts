import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class loginResponseType {
  @Field()
  access_token: string;
}
