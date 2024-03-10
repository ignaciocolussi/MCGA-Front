import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { AuthService } from './auth.service';
import { Note } from '../models/note';
import { Tag } from '../models/tag';
import { User } from '../models/user';
import { NotesResponse } from '../models/responses';
import { TagsResponse } from '../models/responses';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private url = 'https://mcga-back.onrender.com';
  constructor(private _auth: AuthService, private _http: HttpClient) {}

  async getNotes(): Promise<Note[]> {
    // get the user notes form the server doing a gert to www.sdfsd.com using lastValueFrom

    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    // make the request
    try {
      const notes$ = this._http.get<NotesResponse>(`${this.url}/notes`, {
        headers: headers,
      });
      return (await lastValueFrom(notes$)).data as Note[];
    } catch (error) {
      console.debug(error);
      throw new Error('Error recuperando notas!');
    }
  }

  async getTags(): Promise<Tag[]> {
    // get the user notes form the server doing a gert to www.sdfsd.com using lastValueFrom
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    // make the request
    try {
      const tags$ = this._http.get<TagsResponse>(`${this.url}/tags`, {
        headers: headers,
      });
      return (await lastValueFrom(tags$)).data as Tag[];
    } catch (error) {
      console.debug(error);
      throw new Error('Error recuperando notas!');
    }
  }
  async deleteTag(tag: Tag): Promise<void> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    try {
      const res$ = this._http.delete(`${this.url}/tags/${tag._id}`, {
        headers: headers,
      });
      await lastValueFrom(res$);
    } catch (error) {
      console.debug(error);
      throw new Error('Error eliminando nota !');
    }
  }

  async updateNote(note: Note): Promise<Note> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    // make the request
    try {
      const notes$ = this._http.put<Note>(
        `${this.url}/notes/${note._id}`,
        note,
        {
          headers: headers,
        }
      );

      return await lastValueFrom(notes$);
    } catch (error) {
      console.debug(error);
      throw new Error('Error actualizando nota!');
    }
  }

  async createNote(note: Note): Promise<Note> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    // make the request
    try {
      const notes$ = this._http.post<Note>(`${this.url}/notes`, note, {
        headers: headers,
      });

      return await lastValueFrom(notes$);
    } catch (error) {
      console.debug(error);
      throw new Error('Error actualizando nota!');
    }
  }

  async createTag(tag: Tag): Promise<Tag> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    // make the request
    try {
      const tags$ = this._http.post<Tag>(`${this.url}/tags`, tag, {
        headers: headers,
      });

      return await lastValueFrom(tags$);
    } catch (error) {
      console.debug(error);
      throw new Error('Error creando etiqueta!');
    }
  }

  async deleteNote(note: Note): Promise<void> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    try {
      const res$ = this._http.delete(`${this.url}/notes/${note._id}`, {
        headers: headers,
      });
      await lastValueFrom(res$);
    } catch (error) {
      console.debug(error);
      throw new Error('Error eliminando nota !');
    }
  }
}
