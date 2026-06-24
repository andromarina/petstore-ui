/**
 * HOMEWORK: Angular Table Performance Optimization
 *
 * This component intentionally contains 5 performance anti-patterns.
 * Your task is to find and fix each one (marked with TODO #1–#5).
 *
 * Use the "Render counter" button to trigger change detection manually
 * and observe how slow each cycle is before and after your fixes.
 *
 * Hints are in the README at the bottom of this file.
 */

// TODO #1 ─────────────────────────────────────────────────────────────────────
// PROBLEM: Change detection strategy is left at the default (CheckAlways).
// Angular re-checks this component on EVERY change detection cycle in the app,
// even if none of this component's data changed.
//
// FIX: Add  changeDetection: ChangeDetectionStrategy.OnPush  to @Component.
// Then switch all mutable properties to signals/observables so Angular knows
// exactly when a re-check is needed.
// ─────────────────────────────────────────────────────────────────────────────

import {
  ChangeDetectionStrategy,
  Component,
  // ChangeDetectionStrategy, // TODO #1: uncomment and add to @Component
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, startWith, Subscription } from 'rxjs';
import { generateMockUsers, MockUser } from './mock-users';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-users-performance',
  templateUrl: './users-performance.html',
  styleUrl: './users-performance.scss',
  imports: [ReactiveFormsModule, DecimalPipe, ScrollingModule],
  changeDetection: ChangeDetectionStrategy.OnPush, 
})
export class UsersPerformance implements OnInit, OnDestroy {
  protected readonly allUsers: MockUser[] = generateMockUsers(10_000);

  protected readonly searchControl = new FormControl('', { nonNullable: true });

  protected renderCount = signal(0);

  private subscriptions = new Subscription();

  // TODO #2 ───────────────────────────────────────────────────────────────────
  // PROBLEM: filteredUsers is a plain getter.
  // Angular cannot cache its result — it calls this function on every single
  // change detection cycle. With 10,000 users and string comparisons, this
  // is expensive even when the search term hasn't changed at all.
  //
  // FIX: Convert filteredUsers to a computed() signal.
  //   1. Change searchControl to a signal:
  //        protected readonly searchTerm = signal('');
  //   2. Wire the FormControl value into the signal (or drop FormControl entirely).
  //   3. Replace the getter with:
  //        protected readonly filteredUsers = computed(() => {
  //          const term = this.searchTerm().toLowerCase();
  //          return term
  //            ? this.allUsers.filter(u => ...)
  //            : this.allUsers;
  //        });
  //   Now Angular re-runs the filter ONLY when searchTerm changes.
  // ─────────────────────────────────────────────────────────────────────────────
  get filteredUsers(): MockUser[] {
    const term = this.searchControl.value.toLowerCase();
    if (!term) {
      return this.allUsers;
    }
    return this.allUsers.filter(
      (u) =>
        u.firstName.toLowerCase().includes(term) ||
        u.lastName.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term) ||
        u.username.toLowerCase().includes(term),
    );
  }

   trackById(_: number, user: MockUser) { return user.id; }

  ngOnInit(): void {
    // Keep renderCount in sync with form changes so the counter updates.
    this.subscriptions.add(
      this.searchControl.valueChanges
        .pipe(startWith(''), debounceTime(300))
        .subscribe(() => {
          // nothing – just keeps the subscription alive for the homework
        }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  triggerRender(): void {
    this.renderCount.update((c) => c + 1);
  }

  // TODO #3 ───────────────────────────────────────────────────────────────────
  // PROBLEM: getStatusLabel() and getFullName() are plain methods called
  // directly in the template (see users-performance.html).
  // Angular has no idea if their output changed, so it calls them on every
  // change detection cycle — once per row.
  // With 10,000 rows that's 20,000+ calls per cycle.
  //
  // FIX: Create two pure pipes instead:
  //
  //   @Pipe({ name: 'statusLabel', pure: true, standalone: true })
  //   export class StatusLabelPipe implements PipeTransform {
  //     transform(status: number): string {
  //       return status === 1 ? 'Active' : 'Inactive';
  //     }
  //   }
  //
  //   @Pipe({ name: 'fullName', pure: true, standalone: true })
  //   export class FullNamePipe implements PipeTransform {
  //     transform(user: MockUser): string {
  //       return `${user.firstName} ${user.lastName}`;
  //     }
  //   }
  //
  // Then in the template replace:
  //   {{ getStatusLabel(user.userStatus) }}  →  {{ user.userStatus | statusLabel }}
  //   {{ getFullName(user) }}                →  {{ user | fullName }}
  //
  // Pure pipes are only re-evaluated when the input reference changes.
  // ─────────────────────────────────────────────────────────────────────────────
  getStatusLabel(status: number): string {
    return status === 1 ? 'Active' : 'Inactive';
  }

  getFullName(user: MockUser): string {
    return `${user.firstName} ${user.lastName}`;
  }
}

/*
 * ─── HINTS & FURTHER READING ────────────────────────────────────────────────
 *
 * TODO #4 is in users-performance.html — look for @for with track $index.
 * TODO #5 is in users-performance.html — look for the virtual scroll comment.
 *
 * Useful docs:
 *  • ChangeDetectionStrategy.OnPush
 *    https://angular.dev/best-practices/skipping-subtrees
 *  • computed() signals
 *    https://angular.dev/guide/signals#computed-signals
 *  • Pure pipes
 *    https://angular.dev/guide/pipes/pure-and-impure-pipes
 *  • @for track expression
 *    https://angular.dev/guide/templates/control-flow#why-is-track-in-for-blocks-required
 *  • CDK Virtual Scroll
 *    https://material.angular.io/cdk/scrolling/overview
 */
