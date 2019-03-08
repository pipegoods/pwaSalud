import { Component, OnInit } from '@angular/core';
import { PacienteService } from 'src/app/core/paciente.service';
import { Estudiante } from 'src/app/modelos/estudiante.model';
import { RegistroMedico } from 'src/app/modelos/registro-medico.model';
import { HistorialMedico } from 'src/app/modelos/historial-medico.model';
import { Empleado } from 'src/app/modelos/empleo.model';

@Component({
  selector: 'app-atender',
  templateUrl: './atender.component.html',
  styleUrls: ['./atender.component.css']
})
export class AtenderComponent implements OnInit {
  
  formPaciente = {
    tipoPaciente: '1',
    documento : '',
    nombre: '',
    codigo : '',
    semestre: '',
    programa: '',
    estamento: '',
    cargo: '',
    diagnostico: '',
    observaciones: ''
  };
  public showHistorial = false;
  public paciente_exist = 0;
  public estudiante_aux : any;
  public empleado_aux : any;
  private registro : any;
  private historialMedico_aux : any;
  public exits_paciente = false;
  private dataSource = {};
  displayedColumns: string[] = ['fecha', 'diagnostico','observaciones'];
  constructor(private pacienteService : PacienteService) { }

  ngOnInit() {
    
  }

  consultarHistorialMedico () {
    if (this.formPaciente.documento != '' && this.formPaciente.documento != null) {
      this.historialMedico_aux = new HistorialMedico();
      if (this.formPaciente.tipoPaciente == '1') {
        this.pacienteService.consultarDatosPersonales(this.formPaciente.documento.toString(), this.formPaciente.tipoPaciente).subscribe((datos_personales)=>{
          if (datos_personales.exists) {
            (datos_personales.data());

            this.paciente_exist = 1;
            
            this.estudiante_aux = new Estudiante(datos_personales.data().codigo,
            datos_personales.data().programa,
            datos_personales.data().semestre,
            datos_personales.data().nombre,
            parseInt(datos_personales.id));
            this.formPaciente.codigo = this.estudiante_aux.getCodigo;
            this.formPaciente.nombre = this.estudiante_aux.getNombre;
            this.formPaciente.semestre = this.estudiante_aux.getSemestre;
            this.formPaciente.programa = this.estudiante_aux.getPrograma;
            this.pacienteService.consultarHistorialMedico(this.formPaciente.documento.toString(), this.formPaciente.tipoPaciente).subscribe((datos) =>{
              (datos);
              datos.forEach((d : {diagnostico , fecha_registro, observaciones}) => {
                (d);
                this.registro = new RegistroMedico(d.diagnostico, d.fecha_registro, d.observaciones);
                this.historialMedico_aux.agregarRegistroMedico(this.registro);
              });
              this.estudiante_aux.setHistorial = this.historialMedico_aux;
              ( this.estudiante_aux.getHistorial.getRegistrosMedicos);
              
              this.dataSource = this.estudiante_aux.getHistorial.getRegistrosMedicos;
            });
          } else {
            this.paciente_exist = 2;
            this.clearAll();
          }
          this.paciente_exist == 1;
      });
      } else {
        this.pacienteService.consultarDatosPersonales(this.formPaciente.documento.toString(), this.formPaciente.tipoPaciente).subscribe((datos_personales)=>{
          if (datos_personales.exists) {
          (datos_personales.data());
          this.paciente_exist = 1;
          this.empleado_aux = new Empleado(datos_personales.data().cargo,
          datos_personales.data().estamento,
          datos_personales.data().nombre,
          parseInt(datos_personales.id));
          (this.empleado_aux);
          this.formPaciente.nombre = this.empleado_aux.getNombre;
          this.formPaciente.estamento = this.empleado_aux.getCargo;
          this.formPaciente.cargo = this.empleado_aux.getEstamento;
          this.pacienteService.consultarHistorialMedico(this.formPaciente.documento.toString(), this.formPaciente.tipoPaciente).subscribe((datos) =>{
            (datos);
            datos.forEach((d : {diagnostico , fecha_registro, observaciones}) => {
              (d);
              this.registro = new RegistroMedico(d.diagnostico, d.fecha_registro, d.observaciones);
              this.historialMedico_aux.agregarRegistroMedico(this.registro);
            });
            this.empleado_aux.setHistorial = this.historialMedico_aux;
            ( this.empleado_aux.getHistorial.getRegistrosMedicos);
            
            this.dataSource = this.empleado_aux.getHistorial.getRegistrosMedicos;
            
          });
          } else {
            this.paciente_exist = 2;
            this.clearAll();
          }
          
      });
      this.paciente_exist == 1;
      }
    } else {
      this.clearAll();
    }

  }

  guardar () {
    (this.formPaciente.documento);
    this.registro = new RegistroMedico(this.formPaciente.diagnostico, new Date(), this.formPaciente.observaciones);
    
    if (this.estudiante_aux) {
      this.estudiante_aux.getHistorial.addRegistroMedico(this.registro);
      this.pacienteService.agregarRegistroMedico(this.estudiante_aux, 1);
      this.clearAll();
      this.formPaciente.documento = '';
    } else if (this.empleado_aux){
      this.empleado_aux.getHistorial.addRegistroMedico(this.registro);
      this.pacienteService.agregarRegistroMedico(this.empleado_aux, 2);
      this.clearAll();
      this.formPaciente.documento = '';
    } else {
      alert("Accion invalida");
    }
  }

  crearHistorialMedico () {
    if (this.formPaciente.documento != '' && this.formPaciente.nombre != '') {
      if (this.formPaciente.tipoPaciente == '1') {
        if (this.formPaciente.codigo != '' && this.formPaciente.programa != '' && this.formPaciente.semestre != '') {
          ("Ya puedo crear");
          this.estudiante_aux = new Estudiante(parseInt(this.formPaciente.codigo), 
            this.formPaciente.programa, this.formPaciente.semestre, this.formPaciente.nombre, parseInt(this.formPaciente.documento));

            this.pacienteService.crearHistorialMedico(this.estudiante_aux, 1);
          
        } else {
          ("Faltan datos");
        }
      } else {
        if (this.formPaciente.estamento != '' && this.formPaciente.cargo != '') {
          ("Ya puedo crear empleado");
          (this.formPaciente.estamento);
          
          this.empleado_aux = new Empleado(this.formPaciente.cargo, this.formPaciente.estamento, this.formPaciente.nombre, parseInt(this.formPaciente.documento));
          (this.empleado_aux);
          
          this.pacienteService.crearHistorialMedico(this.empleado_aux, 2);
          
        } else {
          ("Faltan datos");
        }
      }
    } else {
      alert("Debes ingresar todos los campos!"); 
    }
    
  }

  openDialogHistorialMedico () {
    if (this.showHistorial) {
      this.showHistorial = false;
    } else {
      this.showHistorial = true;
    }
  }

  private clearAll() {
    this.formPaciente = {
      tipoPaciente: this.formPaciente.tipoPaciente,
      documento : this.formPaciente.documento,
      nombre: '',
      codigo : '',
      semestre: '',
      programa: '',
      estamento: '',
      cargo: '',
      diagnostico: '',
      observaciones: ''
    };

    this.estudiante_aux = null;
    this.empleado_aux = null;
  }
}
