import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor(private firestore: AngularFirestore) { }

  public getMedicamentosInventario (sede) { 
    return this.firestore.collection('Enfermeria' + sede + 'inventarioMedicamento').valueChanges();
  }
}
