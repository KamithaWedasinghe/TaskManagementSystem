import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Hardcoded demo credentials
  private readonly validUser = { username: 'admin', password: 'admin123' };
  isLoggedIn = signal(false);

  login(username: string, password: string): boolean {
    if (username === this.validUser.username && password === this.validUser.password) {
      this.isLoggedIn.set(true);
      return true;
    }
    this.isLoggedIn.set(false);
    return false;
  }

  logout(): void {
    this.isLoggedIn.set(false);
  }
}
