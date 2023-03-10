import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Peticion } from './peticiones.interface';
import { PeticionesService } from 'src/app/services/peticiones.service';



@Component({
  selector: 'app-listado-peticiones',
  templateUrl: './listado-peticiones.component.html',
  styleUrls: ['./listado-peticiones.component.css']
})
export class ListadoPeticionesComponent implements OnInit{

  //creamos Petcion
  Peticion!: any;


//constructor tipo auth
constructor(
  private http: HttpClient,
  private router: Router,
  private peticionService:PeticionesService
  ) { }


 ngOnInit():void {
    // this.Peticion = this.peticionService.getPeticion;
    console.log(this.allPeticiones());

}

allPeticiones(): void{
  this.http.get('http://localhost:8000/api/peticiones')
  .subscribe(res =>{
    // const resp: any = res;
    this.Peticion = res;
    console.log(res);
  });
}


}
