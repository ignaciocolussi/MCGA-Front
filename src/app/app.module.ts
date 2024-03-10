import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicModule } from './public/public.module';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './private/interceptors/auth.interceptor';
import { AuthService } from './private/services/auth.service';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, PublicModule],
  providers: [
    AuthService,
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
