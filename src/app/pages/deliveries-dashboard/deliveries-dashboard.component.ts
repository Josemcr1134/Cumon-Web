import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersHeaderComponent } from '../../shared/users-header/users-header.component';

@Component({
  selector: 'app-deliveries-dashboard',
  imports: [
    RouterModule,
    UsersHeaderComponent
  ],
  templateUrl: './deliveries-dashboard.component.html',
  styleUrl: './deliveries-dashboard.component.css'
})
export class DeliveriesDashboardComponent {

}
