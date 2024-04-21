import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import {
  LoadingController,
  AlertController,
  NavController,
} from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Keyboard } from '@capacitor/keyboard';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  credentials = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    },
    { validator: this.mustMatch('password', 'confirmPassword') }
  );

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private navCtrl: NavController,
    private platform: Platform
  ) {}

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  checkErrors(controlName: string, errorName: string) {
    const control = this.credentials.get(controlName);
    return (
      control &&
      (control.dirty || control.touched) &&
      control.errors &&
      control.errors[errorName]
    );
  }

  get email() {
    return this.credentials.controls['email'];
  }

  get password() {
    return this.credentials.controls['password'];
  }

  async createAccount() {
    const loading = await this.loadingController.create();

    if (this.platform.is('capacitor')) {
      Keyboard.show(); // show the keyboard
      Keyboard.setAccessoryBarVisible({ isVisible: true }); // show the accessory bar
    }

    await loading.present();

    const { email, password } = this.credentials.getRawValue();

    // Check if the email already exists in the database
    const userExists = await this.authService.checkIfUserExists(email);
    if (userExists) {
      await loading.dismiss();
      this.showAlert('Registration failed', 'Email address already in use');
      return;
    }

    // Proceed with registration if email is unique
    this.authService.signUp({ email, password }).then(async (data: any) => {
      await loading.dismiss();

      if (data.error) {
        this.showAlert('Registration failed', data.error.message);
      } else {
        this.showAlert('Signup successful', 'Please login');
        this.navCtrl.navigateBack('');
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
}
