import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import {Router} from '@angular/router';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public loggedIn:boolean = false;

  constructor(private Auth:AuthService, private router:Router, private Token:TokenService) {}

  ngOnInit(): void {
    this.Auth.authStatus.subscribe(
      value =>{
          this.loggedIn = value;
      }
    );
  }

  logout(event:MouseEvent){
      event.preventDefault();
      this.Token.remove();//eliminaos el token de sesion
      this.Auth.changeAuthStatus(false);//cambiamos el estado de la sesion a false
      this.router.navigateByUrl('/login'); //redirijimos al login
  }

}
