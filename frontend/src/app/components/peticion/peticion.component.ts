import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';


@Component({
  selector: 'app-peticion',
  templateUrl: './peticion.component.html',
  styleUrls: ['./peticion.component.css']
})
export class PeticionComponent implements OnInit {

  form!: FormGroup;

  //creamos actualUser
  user!: any;

constructor(
  private formBuilder: FormBuilder,
  private http: HttpClient,
  private router: Router,
  private token: TokenService,
  private auth: AuthService
  ) {

  }


  async ngOnInit(): Promise<void> {
    this.form = this.formBuilder.group({
      user_id: '',
      title: '',
      description: '',
      destinatario: '',
      category_id: '',
      file: ''

    });
    this.user = this.auth.getUser();
    this.user ? '' : this.user = await this.auth.getMe().toPromise();
  }

  onSubmit(){

  }

  submitPeticion(): void{
   const form = this.form.getRawValue();
    if(form.user_id == '' || form.title == '' || form.description == '' || form.description == '' || form.destinatario == '' || form.category_id == ''){
      alert("Debe completar todos los campos");
      return;
    }

    const token = this.token.get();
    const httpOptions = {headers:new HttpHeaders({
      Authorization:`Bearer ${token}`
    })}

     console.log(this.form.getRawValue());
    this.http.post('http://localhost:8000/api/store/peticion',this.form.getRawValue(), httpOptions  )
    .subscribe(res =>{
      const resp: any = res;
      this.auth.setUser(resp.user);
      this.router.navigate(['/all-peticiones']),
      console.log(resp);

    },
      (err)=>console.log(err)

    );
  }





}
