import { Component, inject, input, OnInit, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PetstoreApiUser, UpdateUserRequest } from '../../../models/user';
import { UserServiceTs } from '../../../services/user.service.ts';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.html',
  styleUrl: '../dialog-common.scss',
  imports: [ReactiveFormsModule],
})
export class EditUserDialog implements OnInit {
  protected readonly userService = inject(UserServiceTs);
  protected submitting = false;

  readonly user = input.required<PetstoreApiUser>();
  readonly closed = output<void>();
  readonly userUpdated = output<PetstoreApiUser>();

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
      validators: [Validators.minLength(6)],
    }),
    phone: new FormControl('', {
      nonNullable: true,
      validators: [Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^$|^\d+$/)],
    }),
    userStatus: new FormControl(1, { nonNullable: true }),
  });

  ngOnInit(): void {
    const user = this.user();
    this.form.reset({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: '',
      phone: user.phone,
      userStatus: user.userStatus,
    });
  }

  close(): void {
    this.closed.emit();
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.getRawValue();
    const request: UpdateUserRequest = {
      username: formValue.username.trim(),
      firstName: formValue.firstName.trim(),
      lastName: formValue.lastName.trim(),
      email: formValue.email.trim(),
      password: formValue.password,
      phone: formValue.phone.trim(),
      userStatus: formValue.userStatus,
    };

    this.submitting = true;
    this.userService.updateUser(this.user().id, request).subscribe({
      next: (updatedUser) => {
        this.submitting = false;
        this.userUpdated.emit(updatedUser);
      },
      error: () => {
        this.submitting = false;
        this.close();
      },
    });
  }
}
