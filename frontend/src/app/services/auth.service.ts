import { Injectable } from '@angular/core';
import {TokenService} from './token.service';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import { User } from '../components/profile/profile.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(this.token.loggedIn());
  authStatus = this.loggedIn.asObservable();
  user!: User;



  constructor(private token:TokenService, private http: HttpClient) { }

  changeAuthStatus(value:boolean) {
      this.loggedIn.next(value);
  }


  setUser(user : User): void {
    this.user = user;
  }

  getUser(): User {
    return this.user;
  }

  getMe(): Observable<User> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${localStorage.getItem('token')}`)
    return this.http.get('http://localhost:8000/api/me', {
      headers: headers
    }) as Observable<User>;
  }

}
