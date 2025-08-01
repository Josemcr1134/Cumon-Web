import { Component } from '@angular/core';
import { HeaderComponent } from '../../../shared/header/header.component';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [
    RouterModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public email:string = '';

  constructor(private router:Router){}

  login(){
    if (this.email === 'domi@cumon.com') {
      this.router.navigateByUrl('deliveries-dashboard')
    } else {
      this.router.navigateByUrl('users-dashboard')
    }
  };
}
