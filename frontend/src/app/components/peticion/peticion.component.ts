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

  selectedImage!: any;


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

  submitPeticion(){
    const formData = new FormData();
      const values = this.form.getRawValue();
      formData.append('user_id', values.user_id);
      formData.append('title', values.title);
      formData.append('category_id', values.category_id);
      formData.append('description', values.description);
      formData.append('destinatario', values.destinatario);
      formData.append('file', this.selectedImage);

      const token = this.token.get();
      const httpOptions = {headers:new HttpHeaders({
        Authorization:`Bearer ${token}`,
      })}

      httpOptions.headers.append('Content-Type', 'multipart/form-data'),
      httpOptions.headers.append('Accept', 'application/json'),

       console.log(this.form.getRawValue());
      this.http.post('http://localhost:8000/api/store/peticion', formData, httpOptions )
      .subscribe(res =>{
        const resp: any = res;
        this.auth.setUser(resp.user);
        this.router.navigate(['/mis-peticiones']),
        console.log(resp);

      },
        (err)=>console.log(err)

      );

  }


// ** Evento para seleccionar las imagenes
onSelectImage(event: any) {
  this.selectedImage = event.target.files[0];
}


}
