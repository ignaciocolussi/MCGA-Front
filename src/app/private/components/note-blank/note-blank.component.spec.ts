import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteBlankComponent } from './note-blank.component';

describe('NoteBlankComponent', () => {
  let component: NoteBlankComponent;
  let fixture: ComponentFixture<NoteBlankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NoteBlankComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoteBlankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
