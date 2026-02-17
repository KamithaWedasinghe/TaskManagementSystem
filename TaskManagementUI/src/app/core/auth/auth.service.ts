import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly validUser = { username: 'admin', password: 'admin123' };
  private readonly storageKey = 'isLoggedIn';
  isLoggedIn = signal(this.getStoredLoginState());

  private getStoredLoginState(): boolean {
    return localStorage.getItem(this.storageKey) === 'true';
  }

  login(username: string, password: string): boolean {
    if (username === this.validUser.username && password === this.validUser.password) {
      this.isLoggedIn.set(true);
      localStorage.setItem(this.storageKey, 'true');
      return true;
    }
    this.isLoggedIn.set(false);
    localStorage.setItem(this.storageKey, 'false');
    return false;
  }

  logout(): void {
    this.isLoggedIn.set(false);
    localStorage.setItem(this.storageKey, 'false');
  }
}
