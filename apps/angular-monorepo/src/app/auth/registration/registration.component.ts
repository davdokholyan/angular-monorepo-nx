import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MatStep, MatStepper } from '@angular/material/stepper';
import { RegistrationManagementService } from '../../services';
import { RouteEnum, UserRegistrationStepEnum } from '@core/models/enums';
import { filter } from 'rxjs';

@Component({
  selector: 'app-registration',
  imports: [CommonModule, RouterOutlet, MatStep, MatStepper],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  regService = inject(RegistrationManagementService);

  steps = Object.values(UserRegistrationStepEnum);
  UserRegistrationStepEnum = UserRegistrationStepEnum;

  private currentRoute = signal<string | null>(null);

  stepIndex = computed(() => {
    const route = this.currentRoute();
    return route ? this.steps.indexOf(route as UserRegistrationStepEnum) : 0;
  });

  constructor() {
    this.trackRouteChanges();
  }

  private trackRouteChanges(): void {
    effect(() => {
      this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd)
      ).subscribe(() => {
        this.updateCurrentRoute();
      });


      this.updateCurrentRoute();
    });
  }

  private updateCurrentRoute(): void {
    const currentPath = this.activatedRoute.firstChild?.snapshot.routeConfig?.path || null;
    this.currentRoute.set(currentPath);
  }

  onStepChange(event: { selectedIndex: number }): void {
    const targetStep = this.steps[event.selectedIndex];
    void this.router.navigate([`/${RouteEnum.AUTH}/${RouteEnum.REGISTRATION}/${targetStep}`]);
  }
}
