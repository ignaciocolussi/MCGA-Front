import { Component, Input } from '@angular/core';
import { Note } from '../../models/note';

import { TagComponent } from '../tag/tag.component';

@Component({
  selector: 'app-note-mini',
  templateUrl: './note-mini.component.html',
  styleUrl: './note-mini.component.scss',
})
export class NoteMiniComponent {
  @Input() note!: Note;

  constructor() {}
}
