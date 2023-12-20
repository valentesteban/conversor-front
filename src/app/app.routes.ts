import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { loggedGuard } from './guards/login.guard';
import { PlanComponent } from './pages/plan/plan.component';
import { SettingsComponent } from './pages/settings/settings.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Inicio | Conversor' },
  { path: 'home', component: HomeComponent, title: 'Inicio | Conversor' },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
    title: 'Iniciar sesión | Conversor',
    //canActivate: [loggedGuard],
  },
  {
    path: 'register',
    pathMatch: 'full',
    component: RegisterComponent,
    title: 'Registrarse | Conversor',
    //canActivate: [notLoggedGuard],
  },
  {
    path: 'planes',
    pathMatch: 'full',
    component: PlanComponent,
    title: 'Planes | Conversor',
    //canActivate: [notLoggedGuard],
  },
  {
    path: 'configuracion',
    pathMatch: 'full',
    component: SettingsComponent,
    title: 'Configuracion | Conversor',
    canActivate: [loggedGuard],
  },

];