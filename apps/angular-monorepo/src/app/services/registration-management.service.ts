import { computed, inject, Injectable, signal } from '@angular/core';
import { IStep1Data, IStep2Data, IStep3Data, Nullable, IUserData } from '@core/models/interfaces';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { RouteEnum } from '@core/models/enums';

@Injectable({ providedIn: 'root'})
export class RegistrationManagementService {
  private router = inject(Router);
  private authService = inject(AuthService);

  private storageKeys = {
    step1: 'step1',
    step2: 'step2',
    step3: 'step3',
    currentUser: 'currentUser',
  };

  step1Data = signal<Nullable<IStep1Data>>(this.loadData<IStep1Data>(this.storageKeys.step1));
  step2Data = signal<Nullable<IStep2Data>>(this.loadData<IStep2Data>(this.storageKeys.step2));
  step3Data = signal<Nullable<IStep3Data>>(this.loadData<IStep3Data>(this.storageKeys.step3));

  isStep1Complete = computed(() => !!this.step1Data());
  isStep2Complete = computed(() => !!this.step2Data());
  isStep3Complete = computed(() => !!this.step3Data());

  completeStep1(data: IStep1Data) {
    this.updateData(this.storageKeys.step1, this.step1Data, data);
  }

  completeStep2(data: IStep2Data) {
    this.updateData(this.storageKeys.step2, this.step2Data, data);
  }

  completeStep3(data: IStep3Data) {
    this.updateData(this.storageKeys.step3, this.step3Data, data);
  }

  clearDataAndLogin() {
    if (!this.isStep1Complete() && !this.isStep2Complete() && !this.isStep3Complete()) return;

    this.authService.login(this.collectUserData());

    Object.values(this.storageKeys).forEach((key) => {
      if (key !== this.storageKeys.currentUser) {
        localStorage.removeItem(key);
      }
    });

    this.step1Data.set(null);
    this.step2Data.set(null);
    this.step3Data.set(null);

    this.changeRoute([`/${RouteEnum.DASHBOARD}`]);
  }

  changeRoute(url: string[]) {
    void this.router.navigate(url);
  }

  private loadData<T>(key: string): Nullable<T> {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  private updateData<T>(key: string, signalRef: ReturnType<typeof signal>, data: T) {
    signalRef.set(data);
    localStorage.setItem(key, JSON.stringify(data));
  }

  private collectUserData(): IUserData {
    return {
      ...this.step1Data(),
      ...this.step2Data(),
      ...this.step3Data(),
    } as IUserData;
  }
}
