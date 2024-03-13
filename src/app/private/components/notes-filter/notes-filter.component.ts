import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChange,
} from '@angular/core';
import { Tag } from '../../models/tag';
import { TagComponent } from '../tag/tag.component';
import { NotesService } from '../../services/notes.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-notes-filter',
  templateUrl: './notes-filter.component.html',
  styleUrl: './notes-filter.component.scss',
})
export class NotesFilterComponent {
  @Output() filterTagsEvent = new EventEmitter();
  @Output() deleteTagEvent = new EventEmitter();
  @Output() createTagEvent = new EventEmitter();
  @Input() tags!: Tag[];
  @Input() allowDelete: boolean = false;
  @Input() allowCreate: boolean = true;
  @Input() resetFilter: EventEmitter<boolean> | undefined;
  private tag!: Tag;
  public filteredTags: Tag[] = [];
  modalTag: bootstrap.Modal | undefined;
  modalDeleteTag: bootstrap.Modal | undefined;

  public TagForm = new FormGroup({
    text: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(8),
    ]),
    color: new FormControl('', [Validators.required]),
  });

  constructor() {}

  async ngOnInit() {
    if (this.resetFilter) {
      this.resetFilter.subscribe((value: boolean) => {
        if (value) {
          this.filteredTags = [];
        }
      });
    }
  }

  onTagSelected(tag: Tag) {
    if (this.filteredTags.includes(tag)) {
      this.filteredTags = this.filteredTags.filter((t) => t !== tag);
    } else {
      this.filteredTags.push(tag);
    }

    this.filterTagsEvent.emit(this.filteredTags);
  }

  isFiltered(tag: Tag): boolean {
    return this.filteredTags.includes(tag);
  }

  onDeleteTag(tag: Tag) {
    this.filteredTags = this.filteredTags.filter((t) => t !== tag);
    let element = document.getElementById('deletetagmodal') as HTMLElement;
    this.modalDeleteTag = new bootstrap.Modal(element, {});
    this.tag = tag;
    this.modalDeleteTag?.show();
  }

  deleteTag() {
    this.filteredTags = this.filteredTags.filter(
      (t: Tag) => t._id !== this.tag._id
    );
    this.deleteTagEvent.emit(this.tag);
  }

  createTag() {
    let element = document.getElementById('modalTag') as HTMLElement;
    this.modalTag = new bootstrap.Modal(element, {});

    this.modalTag?.show();
  }

  onSubmit() {
    if (this.TagForm.invalid) {
      return;
    }

    if (this.TagForm.value.color && this.TagForm.value.text) {
      let tag: Tag = {
        _id: null,
        __v: 0,
        text: this.TagForm.value.text,
        color: this.TagForm.value.color,
        owner: '',
      };
      this.createTagEvent.emit(tag);

      this.modalTag?.hide();

      this.TagForm.reset();
      this.TagForm.clearValidators();
    }
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    let change: SimpleChange = changes['filterTags'];

    if (change && change.currentValue == false) {
      this.filteredTags = [];
    }
  }
}
