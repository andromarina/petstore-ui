import { Component } from '@angular/core';
import { Header } from "./layout/header/header";
import { SidePanel } from './layout/side-panel/side-panel';
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header, SidePanel, RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  protected readonly pageTitle = "Users";
  onUserSelected() {
    console.log('App level User selected');
    // You can add additional logic here to handle the selected user
  }
}
