import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private firestore: AngularFirestore) { }

  consultarHistorialMedico (documento) {
    return this.firestore.collection('Pacientes').doc(documento).snapshotChanges();
  }
}
