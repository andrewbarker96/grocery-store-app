import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    this.loadUserData();
  }

  loadUserData() {
    this.user = this.authService.getCurrentUser();
  }

  saveUserData() {
    this.authService.updateUser(this.user);
  }
}
