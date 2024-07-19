import { ApolloError } from 'apollo-server-express';

export class UserNotFoundError extends ApolloError {
  constructor() {
    super('User not found', 'USER_NOT_FOUND2');
  }
}
