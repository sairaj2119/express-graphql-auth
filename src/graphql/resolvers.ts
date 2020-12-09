import jwt from 'jsonwebtoken';
import { validate } from 'class-validator';

import { User } from '../entity/User';

export const resolvers = {
  Query: {
    hello: () => 'hello',
  },
  Mutation: {
    register: async (
      _: any,
      {
        username,
        email,
        password,
      }: { username: string; email: string; password: string }
    ) => {
      const user = new User();
      user.username = username;
      user.email = email;
      user.password = password;
      const errors = await validate(user);
      if (errors.length > 0) {
        console.log(errors);
        throw new Error('register error');
      } else {
        await user.save();
        const token = jwt.sign({ id: user.id }, 'asdfasfdasdf', {
          expiresIn: '60m',
        });
        return { token };
      }
    },
  },
};
