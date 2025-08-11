import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import 'animate.css';

/**
 * Root component of the Angular application
 *
 * @Component
 * @selector app-root
 *
 * @description
 * The main application component that serves as the root container for:
 * - Router outlet for navigation
 * - Global animations via animate.css
 * - Base layout structure
 *
 * @example
 * <app-root></app-root>
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  /**
   * Application title
   * @type {string}
   * @default 'platform'
   */
  title = 'platform';
}
