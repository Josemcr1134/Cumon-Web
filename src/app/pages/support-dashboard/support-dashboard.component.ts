import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersHeaderComponent } from '../../shared/users-header/users-header.component';

@Component({
  selector: 'app-support-dashboard',
  imports: [
    RouterModule,
    UsersHeaderComponent
  ],
  templateUrl: './support-dashboard.component.html',
  styleUrl: './support-dashboard.component.css'
})
export class SupportDashboardComponent {

}
