import { computed, inject, Injectable, signal } from '@angular/core';
import { IUserData, Nullable } from '@core/models/interfaces';
import { Router } from '@angular/router';
import { RouteEnum } from '@core/models/enums';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly userKey = 'currentUser';
  private readonly router = inject(Router);

  userData = signal<Nullable<IUserData>>(this.loadUserData());

  isAuthenticated = computed(() => !!this.userData());

  login(user: Partial<IUserData>): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.userData.set(user as IUserData);
  }

  logout(): void {
    localStorage.removeItem(this.userKey);
    this.userData.set(null);
    void this.router.navigate([`/${RouteEnum.AUTH}`]);
  }

  private loadUserData(): Nullable<IUserData> {
    const user = localStorage.getItem(this.userKey);
    return user ? (JSON.parse(user) as IUserData) : null;
  }
}
