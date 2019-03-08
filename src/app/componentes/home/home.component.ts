import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor(public auth: AuthService) {
    this.auth.user.subscribe((d)=>{
      console.log(d);
      
    });
    
   }

  ngOnInit() {
  }

  logout() {
    this.auth.signOut();
  }

  getSede(sede) {
    switch (sede) {
      case 'PiedraBolivar':
        return 'Pierdra de Bolivar';
        break;
      case 'SanPablo':
        return 'San pablo';
        break;
      case 'SanAgustin':
        return 'San agustin';
        break;
      case 'Zaragocilla':
        return 'Zaragocilla';
        break;
      default:
        return 'Sede invalida'
        break;
    }
}
