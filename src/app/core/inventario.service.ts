import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Medicamento } from '../modelos/medicamento.model';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor(private firestore: AngularFirestore) { }

  public getMedicamentosInventario (sede) { 
    return this.firestore.collection('Enfermeria/' + sede + '/InventarioMedicamento/').valueChanges();
  }

  public agregarMedicamento(sede,medicina : Medicamento) {
    return this.firestore.collection('Enfermeria/' + sede + '/InventarioMedicamento/').add({
      cantidad: medicina.getCantidad,
      nombre: medicina.getNombre,
      presentacion: medicina.getPresentacion,
      vencimiento: medicina.getVencimiento
    });
  }

  public modificarMedicamento(sede, nombre) {
    return this.firestore.collection('Enfermeria/' + sede + '/InventarioMedicamento/', ref => ref.where('nombre', '==', nombre).limit(1)).get();

  }

  public setMedicamento (sede, medicina : Medicamento, id){
    console.log(id);
    
    return this.firestore.collection('/Enfermeria/' + sede + '/InventarioMedicamento/').doc(id).set(
      {
        cantidad: medicina.getCantidad,
        nombre: medicina.getNombre,
        presentacion: medicina.getPresentacion,
        vencimiento: medicina.getVencimiento
      }
    );
  }

  public retirarMedicamento (sede, id) {
    return this.firestore.collection('/Enfermeria/' + sede + '/InventarioMedicamento/').doc(id).delete();
  }
}
