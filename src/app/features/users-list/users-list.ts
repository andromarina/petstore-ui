import { Component } from '@angular/core';

type User = {
  id: number;
  username: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  status: 'active' | 'inactive';
};

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.html',
  styleUrl: './users-list.scss',
})
export class UsersList {
  protected readonly users: User[] = [
    {
      id: 1,
      username: 'johndoe',
      fullName: 'John Doe',
      email: 'john@petstore.io',
      phone: '+1-555-0101',
      role: 'Admin',
      status: 'active',
    },
    {
      id: 2,
      username: 'alice.moss',
      fullName: 'Alice Moss',
      email: 'alice@petstore.io',
      phone: '+1-555-0102',
      role: 'Staff',
      status: 'active',
    },
    {
      id: 3,
      username: 'bob.kane',
      fullName: 'Bob Kane',
      email: 'bob@petstore.io',
      phone: '+1-555-0103',
      role: 'Staff',
      status: 'inactive',
    },
    {
      id: 4,
      username: 'carol.smith',
      fullName: 'Carol Smith',
      email: 'carol@petstore.io',
      phone: '+1-555-0104',
      role: 'Customer',
      status: 'active',
    },
    {
      id: 5,
      username: 'dave.lee',
      fullName: 'Dave Lee',
      email: 'dave@petstore.io',
      phone: '+1-555-0105',
      role: 'Customer',
      status: 'active',
    },
  ];

}
