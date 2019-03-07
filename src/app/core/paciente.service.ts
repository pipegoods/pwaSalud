import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Estudiante } from '../modelos/estudiante.model';
import { HistorialMedico } from '../modelos/historial-medico.model';
import { RegistroMedico } from '../modelos/registro-medico.model';
import { Paciente } from '../modelos/paciente.model';

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
      let registro_aux = paciente.getHistorial.getRegistrosMedicos.pop();
      return this.firestore.collection('Paciente/Estudiante/Lista/' + paciente.getDocumento.toString() + '/historialMedico/').add(
        {
          diagnostico : registro_aux.getDiagnostico,
          fecha_registro : registro_aux.getFecha,
          observaciones : registro_aux.getObservaciones
        }
      );
    } else {
      let registro_aux = paciente.getHistorial.getRegistrosMedicos.pop();
      console.log(registro_aux);
      
      return this.firestore.collection('Paciente/Empleado/Lista/' + paciente.getDocumento.toString() + '/historialMedico/').add(
        {
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
      console.log(paciente);
      
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
}
