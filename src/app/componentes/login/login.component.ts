import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
export interface SelectModelo {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  detailForm: FormGroup;
  roles: SelectModelo[] = [
    {value: 'doctor', viewValue: 'Doctor'},
    {value: 'enfermera', viewValue: 'Enfermera'},
    {value: 'enfermera-jefe', viewValue: 'Enfermera jefe'},
    {value: 'odontologo', viewValue: 'Odontologo'}
  ];
  sedes: SelectModelo[] = [
    {value: 'PiedraBolivar', viewValue: 'Piedra de bolivar'},
    {value: 'SanPablo', viewValue: 'San pablo'},
    {value: 'SanAgustin', viewValue: 'San agustin'},
    {value: 'Zaragocilla', viewValue: 'Zaragocilla'}
  ];
  constructor(private authS: AuthService,
    private router: Router,
    public fb: FormBuilder) { }

  ngOnInit() {
    this.detailForm = this.fb.group({
      'sede': ['', [ Validators.required ] ],
      'rol': ['', [ Validators.required ] ]
    });
  }

  async signInWithGoogle() {
    await this.authS.googleLogin();
    return await this.afterSignIn();
  }

  private afterSignIn() {
    
    this.authS.currentUser.subscribe((user) => {
      console.log(user);
      
    })
 
    return this.router.navigate(['/']);

  }
  get sede() { return this.detailForm.get('sede') }
  get rol() { return this.detailForm.get('rol') }

  setCatchPhrase(user) {
    return this.authS.updateUser(user, { sede:  this.sede.value, rol: this.rol.value })
  }
}
