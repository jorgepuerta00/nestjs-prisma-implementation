import { Prisma } from '@prisma/client';

export const customers: Prisma.CustomerUpsertArgs['create'][] = [
  {
    id: '9e391faf-64b2-4d4c-b879-463532920fd3',
    email: 'user@gmail.com',
    password: '$2b$10$EGsIsf6RXJBmN8BMYQEzbOWXgBBbm4mFGyoiyaIqQ0.6x4PwCmzbO',
    activationCode: 'random-activation-code',
    isVerified: false,
    refreshToken: null,
  },
  {
    id: '9e391faf-64b2-4d4c-b879-463532920fd4',
    email: 'user2@gmail.com',
    password: '$2b$10$EGsIsf6RXJBmN8BMYQEzbOWXgBBbm4mFGyoiyaIqQ0.6x4PwCmzbO',
    activationCode: 'random-activation-code',
    isVerified: false,
    refreshToken: null,
  },
];
