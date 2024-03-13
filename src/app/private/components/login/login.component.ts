import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private _auth: AuthService, private _router: Router) {}

  ngOnInit() {}

  async onSubmit() {
    if (!this.loginForm.value.email) {
      this.loginForm.controls['email'].setErrors({ required: true });
    }
    if (!this.loginForm.value.password) {
      this.loginForm.controls['password'].setErrors({ incorrect: true });
    }

    if (this.loginForm.value.email && this.loginForm.value.password) {
      try {
        await this._auth.login({
          email: this.loginForm.value.email,
          password: this.loginForm.value.password,
        });
        this._router.navigate(['/private/home']);
      } catch (error) {
        this.loginForm.setErrors({ incorrect: true });
        this.loginForm.controls['email'].setErrors({ incorrect: true });
        this.loginForm.controls['password'].setErrors({ incorrect: true });
        console.debug(error);
        console.debug('error en login!');
      }
    }
  }

  resetValidators() {
    this.loginForm.controls['email'].setErrors(null);
    this.loginForm.controls['password'].setErrors(null);
  }
}
