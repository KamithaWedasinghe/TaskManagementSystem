import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, NgIf],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  username = '';
  password = '';
  loginError = signal(false);
  private authService = inject(AuthService);
  private router = inject(Router);

  onLogin() {
    const success = this.authService.login(this.username, this.password);
    this.loginError.set(!success);
    if (success) {
      this.router.navigate(['/dashboard']);
    }
  }
}
