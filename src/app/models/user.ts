import { UserRole } from './auth';

export type PetstoreApiUser = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  userStatus: number;
  role: UserRole;
};

export type CreateUserRequest = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  userStatus: number;
  role?: UserRole;
};

export type UpdateUserRequest = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  userStatus: number;
  role?: UserRole;
};