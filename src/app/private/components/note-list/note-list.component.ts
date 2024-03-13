import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Note } from '../../models/note';
import { Tag } from '../../models/tag';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.scss',
})
export class NoteListComponent {
  @Input() notes!: Note[];
  @Input() tags!: Tag[];
  @Output() changeNoteEvent = new EventEmitter();
  @Output() deleteNoteEvent = new EventEmitter();

  modalNote: bootstrap.Modal | undefined;
  public note!: Note;
  public resetFilter = new EventEmitter<boolean>();
  public NoteForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    content: new FormControl(''),
  });

  onFilterChange(filter: Event) {
    console.debug('Filter changed', filter);
  }

  openNote(note?: Note) {
    if (note) {
      this.note = note;
    } else {
      this.note = {
        _id: '',
        title: '',
        content: '',
        tags: [],
        owner: '',
        created: new Date(),
        updated: new Date(),
      };
    }

    let element = document.getElementById('modalNote') as HTMLElement;
    this.modalNote = new bootstrap.Modal(element, {});

    this.NoteForm.controls['title'].setValue(this.note.title);
    this.NoteForm.controls['content'].setValue(this.note.content);
    this.modalNote?.show();
  }

  async onSubmit() {
    this.note.title = this.NoteForm.value.title as string;
    this.note.content = this.NoteForm.value.content as string;

    try {
      this.changeNoteEvent.emit(this.note);
      this.modalNote?.hide();
      this.NoteForm.clearValidators();
      this.NoteForm.reset();
      this.note = {
        _id: '',
        title: '',
        content: '',
        tags: [],
        owner: '',
        created: new Date(),
        updated: new Date(),
      };
      this.resetFilter.emit(true);
    } catch (error: any) {
      console.debug((error as Error).message);
    }
  }

  onTagFilterChangeForm(tags: any) {
    console.debug('Recibo evento', tags);
    this.note.tags = [...tags];
  }

  deleteNote(note: Note) {
    this.deleteNoteEvent.emit(note);
    this.modalNote?.hide();
    this.NoteForm.clearValidators();
  }
}
