import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-actualizar-mis-peticiones',
  templateUrl: './actualizar-mis-peticiones.component.html',
  styleUrls: ['./actualizar-mis-peticiones.component.css'],
})
export class ActualizarMisPeticionesComponent implements OnInit {
  //creamos Petcion
  MiPeticion!: any;

  id!: any;
  title = '';
  description = '';
  destinatario = '';

  //constructor tipo auth
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private token: TokenService,
  ) {
    (this.id = this.route.snapshot.paramMap.get('id')), console.log(this.id);
  }

  ngOnInit(): void {
    this.getRecord(this.id);
  }

  getRecord(id: any) {
    const token = this.token.get();
    const httpOptions = {headers:new HttpHeaders({
      Authorization:`Bearer ${token}`
    })}

    return this.http
      .get('http://127.0.0.1:8000/api/get/' + id, httpOptions)
      .subscribe((res) => {
        console.log(res);
        this.MiPeticion = res;

        // ASIGNAMOS LOS VAROLES DEL FORMULARIO
        this.title = this.MiPeticion.title;
        this.description = this.MiPeticion.description;
        this.destinatario = this.MiPeticion.destinatario;

        console.log(this.MiPeticion);
      });
  }

  updatePeticion() {
    const token = this.token.get();
    const httpOptions = {headers:new HttpHeaders({
      Authorization:`Bearer ${token}`
    })}

    // body que recive el servicio
    const body = {
      title: this.MiPeticion.title,
      description: this.MiPeticion.description,
      destinatario: this.MiPeticion.destinatario,
    };

    // controlo que los campos no vengan vacios
    if(body.title == '' || body.description == '' || body.destinatario == '' ){
      alert("Debe rellenar todos los campos para actualizar la peticion");
      return;
    }

    // envio la petcion
    return this.http
      .put('http://127.0.0.1:8000/api/petitionUpdate/' + this.id, body, httpOptions)
      .subscribe((res) => {
        console.log(res);
        this.router.navigateByUrl('/admin-peticiones');
      });
  }
}
