import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { LandingComponent } from './components/landing/landing.component';

@NgModule({
  declarations: [PublicComponent,LandingComponent,],
  imports: [CommonModule, PublicRoutingModule, HttpClientModule],
})
export class PublicModule {}
