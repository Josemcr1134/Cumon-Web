import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-users-header',
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './users-header.component.html',
  styleUrl: './users-header.component.css'
})
export class UsersHeaderComponent {
  public showMobileMenu:boolean = false;
  public showUserMenu:boolean = false;
  @Input() isStaff:boolean = false;
  @Input() isDelivery:boolean = false;
}
