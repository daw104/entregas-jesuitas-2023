import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; //MODULO DE FOTMS
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { PeticionComponent } from './components/peticion/peticion.component';
import { ListadoPeticionesComponent } from './components/listado-peticiones/listado-peticiones.component';
import { HomeComponent } from './components/home/home.component';
import { MisPeticionesComponent } from './components/mis-peticiones/mis-peticiones.component';
import { ObjToArrayPipe } from './objToArray.pipe';
import { ActualizarMisPeticionesComponent } from "./components/actualizar-mis-peticiones/actualizar-mis-peticiones.component";





@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    NavbarComponent,
    LoginComponent,
    ProfileComponent,
    PeticionComponent,
    ListadoPeticionesComponent,
    HomeComponent,
    MisPeticionesComponent,
    ObjToArrayPipe,
    ActualizarMisPeticionesComponent


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
