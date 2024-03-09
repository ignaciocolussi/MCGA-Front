import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { LandingComponent } from './components/landing/landing.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    PublicComponent,
    LandingComponent,
    NotFoundComponent,
    SignupComponent,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    HttpClientModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class PublicModule {}
