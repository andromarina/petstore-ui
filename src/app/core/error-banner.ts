// import { Component, inject } from '@angular/core';
// import { ErrorService } from './error.service';

// @Component({
//   selector: 'app-error-banner',
//   standalone: true,
//   template: `
//     @if (errors.message(); as message) {
//       <div class="error-banner">
//         {{ message }}
//         <button type="button" (click)="errors.clear()">Dismiss</button>
//       </div>
//     }
//   `,
//   styles: `
//     .error-banner {
//       background: #fcebeb;
//       color: #a32d2d;
//       display: flex;
//       font-size: 13px;
//       gap: 12px;
//       justify-content: space-between;
//       padding: 8px 20px;
//     }

//     button {
//       background: transparent;
//       border: 1px solid #e24b4a;
//       border-radius: 6px;
//       color: inherit;
//       cursor: pointer;
//       font-size: 12px;
//       padding: 2px 8px;
//     }
//   `,
// })
// export class ErrorBanner {
//   protected readonly errors = inject(ErrorService);
// }
