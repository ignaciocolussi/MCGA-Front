import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  public user!: User;
  constructor(private _auth: AuthService, private _router: Router) {}

  ngOnInit() {
    this.user = this._auth.getUser();
  }

  logout() {
    this._auth.logout();
    this._router.navigate(['/']);
  }
}
