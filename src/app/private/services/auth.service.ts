import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../models/token';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: String = 'https://mcga-back.onrender.com';
  private _token: string = '';
  private _decodedToken!: DecodedToken;

  constructor(private _http: HttpClient) {}

  async login(data: { email: string; password: string }): Promise<void> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    try {
      const token$ = this._http.post<any>(
        `${this.url}/users/login`,
        JSON.stringify(data),
        { headers: headers }
      );
      this._token = (await lastValueFrom(token$)).token;
      await sessionStorage.setItem('token', this._token);
      this._decodedToken = jwtDecode(this._token);
    } catch (error) {
      console.debug(error);
      throw new Error('Error logging in');
    }
  }

  getUser(): User {
    if (!this._decodedToken) {
      const token = sessionStorage.getItem('token');
      if (token) {
        this._token = token;
        this._decodedToken = jwtDecode(token);
      }
    }
    return {
      id: this._decodedToken.id,
      name: this._decodedToken.name,
      surname: this._decodedToken.surname,
      email: this._decodedToken.email,
    };
  }

  getToken(): string {
    if (!this._token) {
      const token = sessionStorage.getItem('token');
      if (token) {
        this._token = token;
      }
    }
    return this._token;
  }

  isLoggedIn(): boolean {
    if (!this._token) {
      const token = sessionStorage.getItem('token');
      if (token) {
        this._token = token;
        this._decodedToken = jwtDecode(token);
      }
    }
    if (this._decodedToken) {
      return this._decodedToken.exp > Date.now() / 1000;
    }
    return false;
  }

  logout() {
    this._token = '';
    this._decodedToken = {} as DecodedToken;
    sessionStorage.removeItem('token');
  }
}
