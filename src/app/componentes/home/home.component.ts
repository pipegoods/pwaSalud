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
      case 'piedra-Bolivar':
        return 'Pierdra de Bolivar';
        break;
      case 'san-Pablo':
        return 'San pablo';
        break;
      case 'san-Agustin':
        return 'San agustin';
        break;
      case 'zaragocilla':
        return 'Zaragocilla';
        break;
      default:
        return 'Sede invalida'
        break;
    }
    
  }
}
