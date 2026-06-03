import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { ErrorBanner } from './core/error-banner';
import { ErrorService } from './core/error.service';
import { Header } from './layout/header/header';
import { SidePanel } from './layout/side-panel/side-panel';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header, SidePanel, RouterOutlet, ErrorBanner],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {
  private readonly router = inject(Router);
  protected readonly errors = inject(ErrorService);
  protected readonly pageTitle = 'Pet Store';

  protected readonly showShell = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => !this.router.url.startsWith('/login')),
      startWith(!this.router.url.startsWith('/login')),
    ),
    { initialValue: !this.router.url.startsWith('/login') },
  );

  testErrorBanner(): void {
    this.errors.show('Test error — remove this button before shipping');
  }
}
