import jwt from 'jsonwebtoken';
import { validate } from 'class-validator';
import bcrypt from 'bcryptjs';
// import { Request, Response } from 'express';1

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
        throw new Error('Register failed');
      } else {
        await user.save();
        const token = jwt.sign({ id: user.id }, 'asdfasfdasdf', {
          expiresIn: '60m',
        });
        return { token };
      }
    },
    login: async (
      _: any,
      { email, password }: { email: string; password: string }
    ) =>
      // { req, res }: { req: Request; res: Response }
      {
        const user = await User.findOne({ where: { email } });

        if (user && (await bcrypt.compare(password, user.password))) {
          console.log('Found a user', user);
          const token = jwt.sign({ id: user.id }, 'asdfasfdasdf', {
            expiresIn: '60m',
          });
          return {
            token,
          };
        } else {
          throw new Error('Login failed');
        }
      },
  },
};
