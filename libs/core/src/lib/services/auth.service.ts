import { computed, Injectable, signal } from '@angular/core';
import { IUserData, Nullable } from '@core/models/interfaces';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly userKey = 'currentUser';

  userData = signal<Nullable<IUserData>>(this.loadUserData());

  isAuthenticated = computed(() => !!this.userData());

  login(user: Partial<IUserData>): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.userData.set(user as IUserData);
  }

  logout(): void {
    localStorage.removeItem(this.userKey);
    this.userData.set(null);
  }

  private loadUserData(): Nullable<IUserData> {
    const user = localStorage.getItem(this.userKey);
    return user ? (JSON.parse(user) as IUserData) : null;
  }
}
