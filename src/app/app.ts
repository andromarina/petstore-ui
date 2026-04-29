import { Component } from '@angular/core';
import { Header } from "./layout/header/header";
import { SidePanel } from './layout/side-panel/side-panel';
import { UsersList } from './features/users-list/users-list';

@Component({
  selector: 'app-root',
  imports: [Header, SidePanel, UsersList],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly pageTitle = "Users";
}
