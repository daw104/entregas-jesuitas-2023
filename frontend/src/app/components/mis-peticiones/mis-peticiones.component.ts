import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PeticionesService } from 'src/app/services/peticiones.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-mis-peticiones',
  templateUrl: './mis-peticiones.component.html',
  styleUrls: ['./mis-peticiones.component.css'],
})
export class MisPeticionesComponent implements OnInit {
  //creamos Petcion
  MiPeticion!: any;

  user!: any;


  //constructor tipo auth
  constructor(
    private http: HttpClient,
    private router: Router,
    private peticionService: PeticionesService,
    private token: TokenService,
    private auth:AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    // this.Peticion = this.peticionService.getPeticion;
    console.log(this.MisPeticiones());
    this.user = this.auth.getUser();
    this.user ? '' : this.user = await this.auth.getMe().toPromise();
    console.log(this.user);

  }


  MisPeticiones(): void{
    const token = this.token.get();
    console.log(token);
    const httpOptions = {headers:new HttpHeaders({
      Authorization:`Bearer ${token}`
    })}
    this.http.get('http://localhost:8000/api/mispeticiones', httpOptions )
    .subscribe(res=>{
      const resp: any = res;
      this.MiPeticion = resp;
      console.log(resp);
    });

  }




}
