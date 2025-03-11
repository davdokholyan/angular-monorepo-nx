import {
  ChangeDetectionStrategy,
  Component,
  computed, DestroyRef,
  inject,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { RegistrationManagementService } from '../../services';
import { RouteEnum, UserRegistrationStepEnum } from '@core/models/enums';
import { filter, startWith } from 'rxjs';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-registration',
  imports: [
    CommonModule,
    RouterOutlet,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef)
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

  onStepChange(event: { selectedIndex: number }): void {
    const targetStep = this.steps[event.selectedIndex];
    void this.router.navigate([`/${RouteEnum.AUTH}/${RouteEnum.REGISTRATION}/${targetStep}`]);
  }

  private trackRouteChanges(): void {
    this.router.events.pipe(
      takeUntilDestroyed(this.destroyRef),
      filter((event) => event instanceof NavigationEnd),
      startWith(null)
    ).subscribe(() => {
      this.updateCurrentRoute();
    });
  }


  private updateCurrentRoute(): void {
    const currentPath = this.activatedRoute.firstChild?.snapshot.routeConfig?.path || null;
    this.currentRoute.set(currentPath);
  }
}
