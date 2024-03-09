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
    document.body.style.backgroundImage = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1920' height='1080' preserveAspectRatio='none' viewBox='0 0 1920 1080'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1063%26quot%3b)' fill='none'%3e%3crect width='1920' height='1080' x='0' y='0' fill='rgba(33%2c 37%2c 41%2c 1)'%3e%3c/rect%3e%3cpath d='M1892.4603033460753 132.11417695969573L2002.7855134064334 5.199540786238288 1875.870877232976-105.12566927411984 1765.5456671726179 21.78896689933761z' fill='rgba(163%2c 71%2c 10%2c 0.45)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M1542.79 842.7 a356.48 356.48 0 1 0 712.96 0 a356.48 356.48 0 1 0 -712.96 0z' fill='rgba(163%2c 71%2c 10%2c 0.45)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M1532.03 929.15 a233.67 233.67 0 1 0 467.34 0 a233.67 233.67 0 1 0 -467.34 0z' fill='rgba(163%2c 71%2c 10%2c 0.45)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M296.72227547591524 1125.3725438251358L360.68564618571736 974.6842856123867 209.9973879729682 910.7209149025846 146.03401726316608 1061.4091731153337z' fill='rgba(163%2c 71%2c 10%2c 0.45)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M467.289%2c1276.666C546.319%2c1280.689%2c624.049%2c1238.314%2c660.269%2c1167.958C694.112%2c1102.218%2c666.743%2c1026.748%2c628.537%2c963.444C591.949%2c902.82%2c538.091%2c847.212%2c467.289%2c848.201C397.729%2c849.172%2c346.521%2c906.526%2c313.657%2c967.841C282.899%2c1025.227%2c276.58%2c1091.609%2c305.58%2c1149.903C338.276%2c1215.627%2c393.976%2c1272.934%2c467.289%2c1276.666' fill='rgba(163%2c 71%2c 10%2c 0.45)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M232.5 214.67 a189.16 189.16 0 1 0 378.32 0 a189.16 189.16 0 1 0 -378.32 0z' fill='rgba(163%2c 71%2c 10%2c 0.45)' class='triangle-float1'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1063'%3e%3crect width='1920' height='1080' fill='white'%3e%3c/rect%3e%3c/mask%3e%3cstyle%3e %40keyframes float1 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(-10px%2c 0)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float1 %7b animation: float1 5s infinite%3b %7d %40keyframes float2 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(-5px%2c -5px)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float2 %7b animation: float2 4s infinite%3b %7d %40keyframes float3 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(0%2c -10px)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float3 %7b animation: float3 6s infinite%3b %7d %3c/style%3e%3c/defs%3e%3c/svg%3e")`;

    this.qtyUsers$ = this.publicService.getAllUsers();

    this.qtyNotes$ = this.publicService.getAllNotes();
  }
}
