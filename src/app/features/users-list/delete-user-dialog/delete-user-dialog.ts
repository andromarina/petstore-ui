import { Component, inject, input, output } from '@angular/core';
import { PetstoreApiUser } from '../../../models/user';
import { UserServiceTs } from '../../../services/user.service.ts';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.html',
  styleUrls: ['../dialog-common.scss', './delete-user-dialog.scss'],
})
export class DeleteUserDialog {
  protected readonly userService = inject(UserServiceTs);
  protected deleting = false;

  readonly user = input.required<PetstoreApiUser>();
  readonly closed = output<void>();
  readonly userDeleted = output<number>();

  close(): void {
    this.closed.emit();
  }

  confirmDelete(): void {
    this.deleting = true;
    this.userService.deleteUser(this.user().id).subscribe({
      next: () => {
        this.deleting = false;
        this.userDeleted.emit(this.user().id);
      },
      error: () => {
        this.deleting = false;
        this.close();
      },
    });
  }
}
