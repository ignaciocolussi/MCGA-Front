import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tag } from '../../models/tag';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss',
})
export class TagComponent {
  @Input() tag!: Tag;
  @Input() deletable: boolean = false;
  @Output() deleteTagEvent = new EventEmitter();
  public textColor: string = '#000000';

  ngOnInit() {
    // Verificamos si el color de la tag es miy claro, si es así, cambiamos el color del texto
    let color = this.tag.color;
    let r = parseInt(color.substr(1, 2), 16);
    let g = parseInt(color.substr(3, 2), 16);
    let b = parseInt(color.substr(5, 2), 16);
    let brightness = (r * 299 + g * 587 + b * 114) / 1000;
    if (brightness > 155) {
      this.textColor = '#000000';
    } else {
      this.textColor = '#ffffff';
    }
  }

  deleteTag(tag: Tag) {
    this.deleteTagEvent.emit(tag);
  }
}
