import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.scss',
  imports: [ReactiveFormsModule],
})
export class Login {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected submitting = false;
  protected loginError: string | null = null;

  protected readonly form = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.getRawValue();
    this.submitting = true;
    this.loginError = null;

    this.authService.login({
      username: formValue.username.trim(),
      password: formValue.password,
    }).subscribe({
      next: () => {
        this.submitting = false;
        const destination = this.authService.isAdmin() ? '/users' : '/';
        void this.router.navigateByUrl(destination);
      },
      error: (error) => {
        this.submitting = false;
        this.loginError = error.error?.message ?? 'Login failed. Check your credentials.';
      },
    });
  }
}
