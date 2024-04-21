import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any;
  firstName: string = '';
  lastName: string = '';
  userEmail: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    this.userEmail = this.user.email; // assuming the user object has an 'email' property
    this.loadUserData();
  }

  loadUserData() {
    this.user = this.authService.getCurrentUser();
    this.userEmail = this.user.email; // update the email when loading user data
  }

  saveUserData() {
    this.authService.updateUser(this.user);
  }
}