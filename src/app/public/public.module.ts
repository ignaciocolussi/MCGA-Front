import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { LandingComponent } from './components/landing/landing.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from '../private/components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component';

@NgModule({
  declarations: [
    PublicComponent,
    LandingComponent,
    NotFoundComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class PublicModule {}
