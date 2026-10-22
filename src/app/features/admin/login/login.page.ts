import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { mensajeDeError } from '../../../core/services/api-error';
import { AuthService } from '../../../core/services/auth.service';
import { Logo } from '../../../shared/components/logo/logo';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, RouterLink, Logo],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',
})
export class LoginPage {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly enviando = signal(false);
  protected readonly error = signal('');
  protected readonly form = inject(FormBuilder).nonNullable.group({
    correo: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor() {
    if (this.auth.autenticado()) this.router.navigateByUrl('/admin');
  }

  protected entrar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { correo, password } = this.form.getRawValue();
    this.enviando.set(true);
    this.error.set('');
    this.auth.login(correo, password).subscribe({
      next: () => this.router.navigateByUrl('/admin'),
      error: (err) => {
        this.error.set(mensajeDeError(err));
        this.enviando.set(false);
      },
    });
  }
}
