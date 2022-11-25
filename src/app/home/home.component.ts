import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router ,private authService:AuthService) { }

  ngOnInit() {
  }
  onServersLoad(id:number) {    
      this.router.navigate(['/servers' ,id])    
  }
  onLogIn(){
    this.authService.logIn();
  }
  onLogOut(){
    this.authService.logOut();
  }
}
