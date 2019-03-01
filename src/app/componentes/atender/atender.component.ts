import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/modelos/paciente.model';
import { PacienteService } from 'src/app/core/paciente.service';

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

  public registrosMedicos = [];
  public exits_paciente = false;
  constructor(private pacienteService : PacienteService) { }

  ngOnInit() {
    
  }

  consultarHistorialMedico () {
    if (this.formPaciente.documento != '') {
      this.pacienteService.consultarHistorialMedico(this.formPaciente.documento.toString()).subscribe((pacienteSnap) => {
        this.registrosMedicos = [];
        if (pacienteSnap.exists) {
          console.log(pacienteSnap.data());
          this.exits_paciente = true;
        } else {
          console.log("No existe el coso ese");
          this.exits_paciente = false;
        }
      });
      
    }    
  }

  guardar () {
    if (this.formPaciente.tipoPaciente == '1') {
      
    } else {
      
    }
    
  }
}
