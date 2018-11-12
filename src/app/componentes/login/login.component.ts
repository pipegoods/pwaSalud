import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authS: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  async signInWithGoogle() {
    await this.authS.googleLogin();
    return await this.afterSignIn();
  }

  private afterSignIn() {
    
    console.log(this.authS.user);
    
    return this.router.navigate(['/']);

  }

}
