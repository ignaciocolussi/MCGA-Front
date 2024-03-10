import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { loggedinGuard } from './guards/loggedin.guard';
import { PrivateComponent } from './private.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', canActivate: [loggedinGuard], component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}
