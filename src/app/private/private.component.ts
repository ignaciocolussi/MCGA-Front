import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrl: './private.component.scss',
})
export class PrivateComponent {
  constructor(private router: Router) {}
  ngOnInit() {
    console.debug(this.router);
  }
}
