import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private firestore: AngularFirestore ) { }

  public consultarDatosPersonales (documento, tipoPaciente) {
    if (tipoPaciente == 1) {
      return this.firestore.collection('Paciente/Estudiante/Lista/').doc(documento).get();
    } else {
      return this.firestore.collection('Paciente/Empleado/Lista/').doc(documento).get();
    }
  }

  public consultarHistorialMedico(documento, tipoPaciente){
    if (tipoPaciente == 1) {
      return this.firestore.collection('Paciente/Estudiante/Lista/' + documento + '/historialMedico/').valueChanges();
    } else {
      return this.firestore.collection('Paciente/Empleado/Lista/' + documento + '/historialMedico/').valueChanges();
    }
  }

  public agregarRegistroMedico (paciente, tipoPaciente){
    if (tipoPaciente == 1) {
      const id = this.firestore.createId();
      let registro_aux = paciente.getHistorial.getRegistrosMedicos.pop();
      return this.firestore.collection('Paciente/Estudiante/Lista/' + paciente.getDocumento.toString() + '/historialMedico/').doc(id).set(
        {
          id : id,
          diagnostico : registro_aux.getDiagnostico,
          fecha_registro : registro_aux.getFecha,
          observaciones : registro_aux.getObservaciones
        }
      );
    } else {
      let registro_aux = paciente.getHistorial.getRegistrosMedicos.pop();
      const id = this.firestore.createId();
      return this.firestore.collection('Paciente/Empleado/Lista/' + paciente.getDocumento.toString() + '/historialMedico/').doc(id).set(
        {
          id : id,
          diagnostico : registro_aux.getDiagnostico,
          fecha_registro : registro_aux.getFecha,
          observaciones : registro_aux.getObservaciones
        }
      );
    }
  }

  public crearHistorialMedico (paciente, tipoPaciente) {
    if (tipoPaciente == 1) {
      return this.firestore.collection('Paciente/Estudiante/Lista').doc(paciente.getDocumento.toString()).set({
        codigo: paciente.getCodigo,
        nombre : paciente.getNombre,
        programa: paciente.getPrograma,
        semestre: paciente.getSemestre,
        documento: paciente.getDocumento
      });
    } else {
      
      return this.firestore.collection('Paciente/Empleado/Lista').doc(paciente.getDocumento.toString()).set({
        cargo: paciente.getCargo,
        nombre : paciente.getNombre,
        estamento: paciente.getEstamento,
        documento: paciente.getDocumento
      });
    }
  }

  public getListaEstudiantes (){
    return this.firestore.collection('Paciente/Estudiante/Lista/').valueChanges();
  }

  public getListaEmpleado (){
    return this.firestore.collection('Paciente/Empleado/Lista/').valueChanges();
  }

  public eliminarPacienteLista(documento, tipo) {
    if (tipo == 1) {
      return this.firestore.collection('Paciente/Estudiante/Lista/').doc(documento.toString()).delete();
    } else {
      return this.firestore.collection('Paciente/Empleado/Lista/').doc(documento.toString()).delete();
    }
  }

  public eliminarHistorialPaciente(documento, tipo, id){
    if (tipo == 1) {
      return this.firestore.collection('Paciente/Estudiante/Lista/' + documento.toString() + '/historialMedico/').doc(id).delete();
    } else {
      return this.firestore.collection('Paciente/Empleado/Lista/' + documento.toString() + '/historialMedico/').doc(id).delete();
    }
  }

  public agregarPacienteDesactivado(paciente, tipo) {
    if (tipo == 1) {
      return this.firestore.collection('PacienteDesactivado/Estudiante/Lista').doc(paciente.getDocumento.toString()).set({
        codigo: paciente.getCodigo,
        nombre : paciente.getNombre,
        programa: paciente.getPrograma,
        semestre: paciente.getSemestre,
        documento: paciente.getDocumento
      });
    } else {
       
      return this.firestore.collection('PacienteDesactivado/Empleado/Lista').doc(paciente.getDocumento.toString()).set({
        cargo: paciente.getCargo,
        nombre : paciente.getNombre,
        estamento: paciente.getEstamento,
        documento: paciente.getDocumento
      });
    }
  }

  public agregarRegistroMedicoDesactivado (paciente, tipoPaciente){
    if (tipoPaciente == 1) {
      let registro_aux = paciente.getHistorial.getRegistrosMedicos.pop();
      return this.firestore.collection('PacienteDesactivado/Estudiante/Lista/' + paciente.getDocumento.toString() + '/historialMedico/').add(
        {
          diagnostico : registro_aux.getDiagnostico,
          fecha_registro : registro_aux.getFecha,
          observaciones : registro_aux.getObservaciones
        }
      );
    } else {
      let registro_aux = paciente.getHistorial.getRegistrosMedicos.pop();
      
      return this.firestore.collection('PacienteDesactivado/Empleado/Lista/' + paciente.getDocumento.toString() + '/historialMedico/').add(
        {
          diagnostico : registro_aux.getDiagnostico,
          fecha_registro : registro_aux.getFecha,
          observaciones : registro_aux.getObservaciones
        }
      );
    }
  }
}
