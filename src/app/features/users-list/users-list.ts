import { Component, EventEmitter, inject, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, Observable, startWith, Subscription, switchMap } from 'rxjs';
import { UserSearchParams, UserServiceTs } from '../../services/user.service.ts';
import { PetstoreApiUser } from '../../models/user';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.html',
  styleUrl: './users-list.scss',
  imports: [AsyncPipe, ReactiveFormsModule]
})
export class UsersList implements OnDestroy {
  protected readonly router = inject(Router);
  protected readonly route = inject(ActivatedRoute);
  protected readonly userService = inject(UserServiceTs);
  protected selectedUserId: number | null = null;

  protected readonly searchControl = new FormGroup({
    email: new FormControl('', { nonNullable: true }),
    firstName: new FormControl('', { nonNullable: true }),
    lastName: new FormControl('', { nonNullable: true }),
  });

  protected users$: Observable<PetstoreApiUser[]> = this.searchControl.valueChanges.pipe(
    startWith(this.searchControl.value),
    debounceTime(300),
    switchMap((value) => {
      const criteria: UserSearchParams = {
        email: (value.email ?? '').trim() || undefined,
        firstName: (value.firstName ?? '').trim() || undefined,
        lastName: (value.lastName ?? '').trim() || undefined,
      };

      if (!criteria.email && !criteria.firstName && !criteria.lastName) {
        return this.userService.getUsers();
      }

      return this.userService.searchUsers(criteria);
    }),
  );

  protected routeSub$: Subscription;
  @Output() userSelected = new EventEmitter<void>();

  constructor() {
    this.routeSub$ = this.route.queryParams.subscribe(params => {
      const userId = params['id'];
      if (userId) {
        this.selectedUserId = +userId;
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub$.unsubscribe();
  }

  clearSearch(): void {
    this.searchControl.reset();
  }

  createUser() {
    this.userSelected.emit();
  }

  onRowClick(user: PetstoreApiUser) {
    this.selectedUserId = user.id;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { id: user.id },
      queryParamsHandling: 'merge',
    });
  }
}
