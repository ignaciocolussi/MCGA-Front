import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicService } from '../../services/public.service';
import { Observable } from 'rxjs';
import { NotesCount, UsersCount } from '../../models/responses';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-landing',
  standalone: false,
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {
  public qtyUsers$!: Observable<UsersCount>;

  public qtyNotes$!: Observable<NotesCount>;

  constructor(private publicService: PublicService) {}

  ngOnInit(): void {
    this.qtyUsers$ = this.publicService.getAllUsers();

    this.qtyNotes$ = this.publicService.getAllNotes();
  }
}
