import { Component, inject, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateUserRequest, PetstoreApiUser } from '../../../models/user';
import { UserServiceTs } from '../../../services/user.service.ts';

@Component({
  selector: 'app-create-user-dialog',
  templateUrl: './create-user-dialog.html',
  styleUrl: '../dialog-common.scss',
  imports: [ReactiveFormsModule],
})
export class CreateUserDialog {
  protected readonly userService = inject(UserServiceTs);
  protected submitting = false;

  readonly closed = output<void>();
  readonly userCreated = output<PetstoreApiUser>();

  protected readonly form = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    firstName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    lastName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email, Validators.minLength(2)],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)],
    }),
    phone: new FormControl('', {
      nonNullable: true,
      validators: [Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^$|^\d+$/)],
    }),
    userStatus: new FormControl(1, { nonNullable: true }),
  });

  close(): void {
    this.closed.emit();
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.getRawValue();
    const request: CreateUserRequest = {
      username: formValue.username.trim(),
      firstName: formValue.firstName.trim(),
      lastName: formValue.lastName.trim(),
      email: formValue.email.trim(),
      password: formValue.password,
      phone: formValue.phone.trim(),
      userStatus: formValue.userStatus,
    };

    this.submitting = true;
    this.userService.createUser(request).subscribe({
      next: (createdUser) => {
        this.submitting = false;
        this.userCreated.emit(createdUser);
      },
      error: () => {
        this.submitting = false;
        this.close();
      },
    });
  }
}
