import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [NgIf],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  title = 'Task Management Dashboard';
  profileName = 'Kamitha Wedasinghe';
  dropdownOpen = signal(false);
  private authService = inject(AuthService);
  private router = inject(Router);

  toggleDropdown() {
    this.dropdownOpen.set(!this.dropdownOpen());
  }

  onLogout(event: Event) {
    event.stopPropagation();
    this.authService.logout();
    this.router.navigate(['/']);
    this.dropdownOpen.set(false);
  }
}
