import { Injectable } from '@angular/core';


import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { switchMap, startWith, tap, filter } from 'rxjs/operators';

interface User {
  uid: string;
  email?: string | null;
  photoURL?: string;
  displayName?: string;
  sede?: string;
  rol?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<User | null>;
  authState: any = null;
  rol = '';
  sede = '';
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.authState = user;
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

   // Returns true if user is logged in
   get authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current user data
  get currentUser(): any {
    return this.afs.doc<User>(`users/${this.authState.uid}`).valueChanges();
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider: any) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(credential => {
       console.log('Bienvenido a pwaSalud');
        return this.updateUserData(credential.user);
      })
      .catch(error => this.handleError(error));
  }

  updateUser(user: User, data: any) { 
    return this.afs.doc(`users/${user.uid}`).update(data)
  }


  private updateUserData(user: User) {
    
    
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );
    userRef.valueChanges().subscribe((user)=>{
       this.rol = user.rol;
      this.sede = user.sede;
      const data: User = {
        uid: user.uid,
        email: user.email || null,
        displayName: user.displayName || 'nameless user',
        photoURL: user.photoURL || 'https://goo.gl/Fz9nrQ',
        rol: this.rol || '',
        sede: this.sede || ''
      };
      return userRef.set(data);
    })
    
    
  }


  private handleError(error: Error) {
    console.error(error);
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }
}
