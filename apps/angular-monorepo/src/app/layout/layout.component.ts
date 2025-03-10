import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, MatButton, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  readonly authService = inject(AuthService);
}
