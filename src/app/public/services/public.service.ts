import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';
import { NotesCount, UsersCount, UserSignedUp } from '../models/responses';
import { UserRegistration } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class PublicService {
  url: String = 'https://mcga-back.onrender.com';

  constructor(private _http: HttpClient) {}

  getAllNotes(): Observable<NotesCount> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.get<NotesCount>(`${this.url}/notes/count`, {
      headers: headers,
    });
  }

  getAllUsers(): Observable<UsersCount> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.get<UsersCount>(`${this.url}/users/count`, {
      headers: headers,
    });
  }

  async postUser(user: UserRegistration): Promise<UserSignedUp> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    let user$ = this._http.post<UserSignedUp>(
      `${this.url}/users/signup`,
      user,
      {
        headers: headers,
      }
    );

    return await lastValueFrom(user$);
  }
}
