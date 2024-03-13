import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PublicService } from '../../services/public.service';
import { UserRegistration } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  public error!: string;
  public signupForm = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    password2: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  constructor(private _publicService: PublicService, private _router: Router) {}

  async onSubmit() {
    if (this.signupForm.value.password !== this.signupForm.value.password2) {
      this.error = 'Las contraseñas no coinciden';
      return;
    }

    if (
      this.signupForm.value.name &&
      this.signupForm.value.surname &&
      this.signupForm.value.email &&
      this.signupForm.value.password
    ) {
      console.debug('Enviando datos al servidor...');
      try {
        const res = await this._publicService.postUser({
          name: this.signupForm.value.name,
          surname: this.signupForm.value.surname,
          email: this.signupForm.value.email,
          password: this.signupForm.value.password,
        });

        //console.debug(res);

        this._router.navigateByUrl('/private/login');
      } catch (error: any) {
        console.error(error);
        this.error = error.error.message;
      }
    }
  }

  resetValidators() {
    this.signupForm.controls['name'].setErrors(null);
    this.signupForm.controls['email'].setErrors(null);
    this.signupForm.controls['password'].setErrors(null);
    this.signupForm.controls['password2'].setErrors(null);
  }
}
