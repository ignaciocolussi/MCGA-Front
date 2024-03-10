import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { PrivateComponent } from './private.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { NoteMiniComponent } from './components/note-mini/note-mini.component';
import { TagComponent } from './components/tag/tag.component';
import { NoteListComponent } from './components/note-list/note-list.component';
import { NotesFilterComponent } from './components/notes-filter/notes-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';
import { NoteBlankComponent } from './components/note-blank/note-blank.component';

@NgModule({
  declarations: [
    PrivateComponent,
    NavbarComponent,
    HomeComponent,
    NoteMiniComponent,
    TagComponent,
    NoteListComponent,
    NotesFilterComponent,
    NoteBlankComponent,
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class PrivateModule {}
