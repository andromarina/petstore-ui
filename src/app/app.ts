import { Component, inject } from '@angular/core';
import { Header } from "./layout/header/header";
import { SidePanel } from './layout/side-panel/side-panel';
import { RouterOutlet } from "@angular/router";
import { ErrorBanner } from './core/error-banner';
import { ErrorService } from './core/error.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header, SidePanel, RouterOutlet, ErrorBanner],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  protected readonly pageTitle = "Users";
  protected readonly errors = inject(ErrorService);

  testErrorBanner(): void {
    this.errors.show('Test error — remove this button before shipping');
  }
  onUserSelected() {
    console.log('App level User selected');
    // You can add additional logic here to handle the selected user
  }
}
