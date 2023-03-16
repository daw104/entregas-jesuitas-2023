import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-admin-peticiones',
  templateUrl: './admin-peticiones.component.html',
  styleUrls: ['./admin-peticiones.component.css']
})
export class AdminPeticionesComponent implements OnInit {

    //creamos Petciones
    peticionesAdmin!: any;

    user!: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private token: TokenService,
    private auth:AuthService
  ) { }


  async ngOnInit(): Promise<void> {
    console.log(this.Peticiones()); 
    this.user = this.auth.getUser();
    this.user ? '' : this.user = await this.auth.getMe().toPromise();
  }

  Peticiones(): void{
    this.http.get('http://localhost:8000/api/peticiones')
    .subscribe(res =>{
      // const resp: any = res;
      this.peticionesAdmin = res;
      console.log(res);
    });
  }

   //eliminar peticion
   deleteData(id:any){
    const token = this.token.get();
    console.log(token);
    const httpOptions = {headers:new HttpHeaders({
      Authorization:`Bearer ${token}`
    })}
    this.http.delete('http://localhost:8000/api/petition/' + id, httpOptions )
    .subscribe(res=>{
      this.peticionesAdmin = res;
      alert(`Eliminaste la Peticion: ${this.peticionesAdmin.title}`);

      // recorremos nuestras peticiones para poder eliminarle del array del front y asi poder recargar la pagina sin la peticion
      for (let i = 0; i <  this.peticionesAdmin.length; i++) {
        if (this.peticionesAdmin[i]==this.peticionesAdmin) {
            this.peticionesAdmin[i].pop();
        }
      }
      this.Peticiones();
      console.log(res);
    });
  }


}
