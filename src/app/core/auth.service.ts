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

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.authState = user;
          return this.afs.doc<User>(`PersonalMedico/${user.uid}`).valueChanges();
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
    return this.afs.doc<User>(`PersonalMedico/${this.authState.uid}`).valueChanges();
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(credential => {
       console.log('Bienvenido a pwaSalud');
        return this.updateUserData(credential.user);
      })
      .catch(error => this.handleError(error));
  }

  updateUser(user: User, data: any) { 
    return this.afs.doc(`PersonalMedico/${user.uid}`).update(data);
  }


  private updateUserData(uuser: User) {
    
    console.log(uuser);
    let data : User;
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `PersonalMedico/${uuser.uid}`
    );
    userRef.valueChanges().subscribe((user)=>{
      if (!(user === undefined)) {
        console.log(user);
        
        data =  {
          uid: user.uid,
          displayName: user.displayName || 'nameless user',
          photoURL: user.photoURL || 'https://goo.gl/Fz9nrQ',
          rol: user.rol || '',
          sede: user.sede || ''
        };
      } else {
         data = {
          uid: uuser.uid,
          displayName: uuser.displayName || 'nameless user',
          photoURL: uuser.photoURL || 'https://goo.gl/Fz9nrQ',
          rol: uuser.rol || '',
          sede: uuser.sede || ''
        };
        
      }
      return userRef.set(data, {merge: true});
   });
      

  }


  private handleError(error: Error) {
    console.error(error);
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
    this.router.navigateByUrl("https://mail.google.com/mail/u/0/?logout&hl=en");
      this.router.navigate(['/']);
    });
  }
}
