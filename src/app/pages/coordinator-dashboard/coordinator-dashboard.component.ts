import { Component } from '@angular/core';
import { UsersHeaderComponent } from '../../shared/users-header/users-header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-coordinator-dashboard',
  imports: [
    UsersHeaderComponent,
    RouterModule
  ],
  standalone:true,
  templateUrl: './coordinator-dashboard.component.html',
  styleUrl: './coordinator-dashboard.component.css'
})
export class CoordinatorDashboardComponent {

}
