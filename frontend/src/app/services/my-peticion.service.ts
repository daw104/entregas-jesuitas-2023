import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MyPeticionService {

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  updateRecord(id: number, data: any) {
    return this.http.put(`http://127.0.0.1:8000/api/petitionUpdate/${id}`, data);
  }


  getRecord(id:any){
    return this.http.get('http://127.0.0.1:8000/api/get/' + id);
  }


  leerPeticionPorUrl() {
    const peticion = this.route.snapshot.paramMap.get('peticion');
    return peticion;
  }




}
