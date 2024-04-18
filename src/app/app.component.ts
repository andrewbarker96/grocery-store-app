// app.component.ts
import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from './components/popover/popover.component';
import { AuthService } from './services/auth.service';
// app.component.ts
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public popoverController: PopoverController, public authService: AuthService, private router: Router) { } // Inject Router

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  login() {
    this.router.navigate(['/login']); // Navigate to the login screen
  }
}
