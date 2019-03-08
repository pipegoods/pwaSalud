import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css'],
})
export class MenuPrincipalComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  public bandera = false;
  constructor(private breakpointObserver: BreakpointObserver,
    private authS: AuthService) {
      this.authS.user.subscribe((d)=>{
        console.log(d);
        if (d.rol == 'enfermera-jefe') {
          this.bandera = true;
        } else {
          this.bandera = false;
        }
      });
    }

}
