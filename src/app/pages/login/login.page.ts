import { AuthService } from '../../services/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { Keyboard } from '@capacitor/keyboard';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  credentials = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private router: Router, 
    private platform: Platform
  )
  
  {
    this.authService.getCurrentUser().subscribe((user) => {
      if (user) {
        this.router.navigateByUrl('/groups', { replaceUrl: true });
      }
    });
  }

  get email() {
    return this.credentials.controls.email;
  }

  get password() {
    return this.credentials.controls.password;
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.authService
      .signIn(this.credentials.getRawValue())
      .then(async (data) => {
        await loading.dismiss();

        if (data.error) {
          this.showAlert('Login failed', data.error.message);
        }
      });
  }

  async showAlert(title: string, msg: string) {
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async forgotPw() {
    const alert = await this.alertController.create({
      header: 'Receive a new password',
      message: 'Please insert your email',
      inputs: [
        {
          type: 'email',
          name: 'email',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Reset password',
          handler: async (result) => {
            const loading = await this.loadingController.create();
            await loading.present();
            const { data, error } = await this.authService.sendPwReset(
              result.email
            );
            await loading.dismiss();

            if (error) {
              this.showAlert('Failed', error.message);
            } else {
              this.showAlert(
                'Success',
                'Please check your emails for further instructions!'
              );
            }
          },
        },
      ],
    });
    await alert.present();
  }

  async getMagicLink() {
    const email = this.credentials.get('email')?.value; // Grab the email from the form entry

    if (this.platform.is('capacitor')) {
      Keyboard.show(); // show the keyboard
      Keyboard.setAccessoryBarVisible({ isVisible: true }); // show the accessory bar
    }
  
    const alert = await this.alertController.create({
      header: 'Sign in with email',
      message: 'Enter your email below. A link will be sent to sign in.',
      inputs: [
        {
          type: 'email',
          name: 'email',
          value: email, // Set the value of the email input field to the grabbed email
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Get Magic Link',
          handler: async (result) => {
            const loading = await this.loadingController.create();
            await loading.present();
            const { data, error } = await this.authService.signInWithEmail(
              result.email
            );
            await loading.dismiss();

            if (error) {
              this.showAlert('Failed', error.message);
            } else {
              this.showAlert(
                'Success',
                'Please check your emails for further instructions!'
              );
            }
          },
        },
      ],
    });
    await alert.present();
  }
}
