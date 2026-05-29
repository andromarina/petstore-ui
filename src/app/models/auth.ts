export type UserRole = 'USER' | 'ADMIN';

export type LoginRequest = {
  username: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
  tokenType: string;
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
};

export type AuthUser = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
};
