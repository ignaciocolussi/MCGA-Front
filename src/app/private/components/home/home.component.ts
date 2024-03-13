import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NotesService } from '../../services/notes.service';
import { User } from '../../models/user';
import { Note } from '../../models/note';
import { Tag } from '../../models/tag';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  toastMessage = '';
  public user: User = this._auth.getUser();
  public notes: Note[] = [];
  public tags: Tag[] = [];
  public error = false;
  private _originalNotesList: Note[] = [];
  public toast!: bootstrap.Toast;
  constructor(private _auth: AuthService, private _notes: NotesService) {}

  async ngOnInit() {
    this.toast = new bootstrap.Toast(
      document.getElementById('toast') as HTMLElement,
      {
        delay: 3000,
        animation: true,
        autohide: true,
      }
    );
    this.notes = await this._notes.getNotes();
    this._originalNotesList.push(...this.notes);

    this.tags = await this._notes.getTags();
  }

  onTagFilterChange(tags: any) {
    tags = tags.map((tag: { _id: any }) => tag._id);

    if (tags.length == 0) {
      this.notes = [];
      this.notes.push(...this._originalNotesList);
      return;
    } else {
      this.notes = this._originalNotesList.filter((note) => {
        return note.tags.some((tag) => tags.includes(tag._id));
      });
    }
  }

  async saveNote(note: Note) {
    if (note._id) {
      try {
        let res$ = this._notes.updateNote(note);
        await res$;
        this.toastMessage = 'Nota actualizada!';
        this.error = false;
        this.toast.show();
      } catch (error) {
        this.toastMessage = 'Se produjo un error al actualizar la nota';
        this.error = true;
        this.toast.show();
      }
    } else {
      try {
        let res$ = this._notes.createNote(note);
        this.notes.push(await res$);
        this.toastMessage = 'Nota guardada!';
        this.error = false;
        this.toast.show();
      } catch (error) {
        this.toastMessage = 'Se produjo un error al guardar la nota';
        this.error = true;
        this.toast.show();
      }
    }
  }

  async onDeleteTag(tag: any) {
    try {
      let res$ = this._notes.deleteTag(tag);
      await res$;
      this.tags.splice(this.tags.indexOf(tag), 1);
      this.notes.map((note) => {
        note.tags.splice(note.tags.indexOf(tag), 1);
      });

      this.notes = this._originalNotesList;
      this.toastMessage = 'Etiqueta eliminada!';
      this.error = false;
      this.toast.show();
    } catch (error) {
      this.toastMessage = 'Se produjo un error al eliminar la etiqueta';
      this.error = true;
      this.toast.show();
    }
  }

  async onCreateTag(tag: any) {
    try {
      let res$ = this._notes.createTag(tag);
      this.tags.push(await res$);
      this.toastMessage = 'Etiqueta creada!';
      this.error = false;
      this.toast.show();
    } catch (error) {
      this.toastMessage = 'Se produjo un error al crear la etiqueta';
      this.error = true;
      this.toast.show();
    }
  }

  async onDeleteNote(note: any) {
    try {
      let res$ = this._notes.deleteNote(note);
      await res$;
      this.notes = this.notes.filter((n) => n._id != note._id);
      this._originalNotesList = this._originalNotesList.filter(
        (n) => n._id != note._id
      );
      this.onTagFilterChange([]);
      this.toastMessage = 'Nota eliminada!';
      this.error = false;
      this.toast.show();
    } catch (error) {
      this.toastMessage = 'Se produjo un error al eliminar la nota';
      this.error = true;
      this.toast.show();
    }
  }
}
