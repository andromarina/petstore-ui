import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, startWith, Subscription } from 'rxjs';
import { UserSearchParams, UserServiceTs } from '../../services/user.service.ts';
import { PetstoreApiUser } from '../../models/user';
import { CreateUserDialog } from './create-user-dialog/create-user-dialog';
import { EditUserDialog } from './edit-user-dialog/edit-user-dialog';
import { DeleteUserDialog } from './delete-user-dialog/delete-user-dialog';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.html',
  styleUrl: './users-list.scss',
  imports: [ReactiveFormsModule, CreateUserDialog, EditUserDialog, DeleteUserDialog],
})
export class UsersList implements OnInit, OnDestroy {
  protected readonly router = inject(Router);
  protected readonly route = inject(ActivatedRoute);
  protected readonly userService = inject(UserServiceTs);

  protected readonly users = signal<PetstoreApiUser[]>([]);
  protected selectedUserId: number | null = null;
  protected showCreateDialog = false;
  protected showEditDialog = false;
  protected userToEdit: PetstoreApiUser | null = null;
  protected showDeleteDialog = false;
  protected userToDelete: PetstoreApiUser | null = null;

  protected readonly searchControl = new FormGroup({
    email: new FormControl('', { nonNullable: true }),
    firstName: new FormControl('', { nonNullable: true }),
    lastName: new FormControl('', { nonNullable: true }),
  });

  private subscriptions = new Subscription();

  ngOnInit(): void {
    this.subscriptions.add(
      this.route.queryParams.subscribe((params) => {
        this.selectedUserId = params['id'] ? +params['id'] : null;
      }),
    );

    this.subscriptions.add(
      this.searchControl.valueChanges
        .pipe(startWith(this.searchControl.getRawValue()), debounceTime(300))
        .subscribe(() => this.loadUsers()),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  protected loadUsers(): void {
    const value = this.searchControl.getRawValue();
    const criteria: UserSearchParams = {
      email: value.email.trim() || undefined,
      firstName: value.firstName.trim() || undefined,
      lastName: value.lastName.trim() || undefined,
    };

    const hasSearch = criteria.email || criteria.firstName || criteria.lastName;
    const request = hasSearch
      ? this.userService.searchUsers(criteria)
      : this.userService.getUsers();

    request.subscribe((users) => {
      this.users.set(users);
    });
  }

  clearSearch(): void {
    this.searchControl.reset();
  }

  openCreateDialog(): void {
    this.showCreateDialog = true;
  }

  closeCreateDialog(): void {
    this.showCreateDialog = false;
  }

  onUserCreated(createdUser: PetstoreApiUser): void {
    this.closeCreateDialog();
    this.loadUsers();
    this.onRowClick(createdUser);
  }

  openEditDialog(user: PetstoreApiUser): void {
    this.userToEdit = user;
    this.showEditDialog = true;
  }

  closeEditDialog(): void {
    this.showEditDialog = false;
    this.userToEdit = null;
  }

  onUserUpdated(updatedUser: PetstoreApiUser): void {
    this.closeEditDialog();
    this.loadUsers();
    this.onRowClick(updatedUser);
  }

  openDeleteDialog(user: PetstoreApiUser): void {
    this.userToDelete = user;
    this.showDeleteDialog = true;
  }

  closeDeleteDialog(): void {
    this.showDeleteDialog = false;
    this.userToDelete = null;
  }

  onUserDeleted(deletedUserId: number): void {
    this.closeDeleteDialog();
    this.loadUsers();

    if (this.selectedUserId !== deletedUserId) {
      return;
    }

    this.selectedUserId = null;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { id: null },
      queryParamsHandling: 'merge',
    });
  }

  onRowClick(user: PetstoreApiUser): void {
    this.selectedUserId = user.id;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { id: user.id },
      queryParamsHandling: 'merge',
    });
  }
}
