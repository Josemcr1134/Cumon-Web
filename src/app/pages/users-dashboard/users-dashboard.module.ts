import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersDashboardRoutingModule } from './users-dashboard-routing.module';
import { UsersDashboardComponent } from './users-dashboard.component';
import { UsersHeaderComponent } from '../../shared/users-header/users-header.component';


@NgModule({
  declarations: [
    UsersDashboardComponent
  ],
  imports: [
    CommonModule,
    UsersDashboardRoutingModule,
    UsersHeaderComponent
  ]
})
export class UsersDashboardModule { }
