import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AfterLoginService } from './services/after-login.service';
import { BeforeLoginService } from './services/before-login.service';
import { PeticionComponent } from './components/peticion/peticion.component';
import { ListadoPeticionesComponent } from './components/listado-peticiones/listado-peticiones.component';



const appRoutes: Routes = [


  {
    path: 'login',
    component: LoginComponent,
    canActivate : [BeforeLoginService]
  },


  {
    path: 'register',
    component: SignupComponent,
    canActivate : [BeforeLoginService]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate : [AfterLoginService]

  },

  {
    path: 'peticion',
    component: PeticionComponent,
    canActivate : [AfterLoginService]
  },

  {
    path: 'all-peticiones',
    component: ListadoPeticionesComponent
  },

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
