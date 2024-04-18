// popover.component.ts
import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { IonicModule } from '@ionic/angular';

@Component({
  templateUrl: './popover.component.html',
})
export class PopoverComponent {
  constructor(
    private popoverController: PopoverController,
    private authService: AuthService
  ) {}

  logout() {
    this.authService.logout();
    this.popoverController.dismiss();
  }
}
