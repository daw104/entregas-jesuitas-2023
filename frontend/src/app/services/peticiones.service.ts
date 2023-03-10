import { Injectable } from '@angular/core';
import {Peticion} from '../components/listado-peticiones/peticiones.interface';


@Injectable({
  providedIn: 'root'
})
export class PeticionesService {

  peticion!: Peticion;

  constructor() { }


  setPeticion(peticion: Peticion): void{
    this.peticion = peticion;
  }

  getPeticion(){
    return this.peticion;
  }




}
