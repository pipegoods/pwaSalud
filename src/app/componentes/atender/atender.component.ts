import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/modelos/paciente.model';

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
  constructor() { }

  ngOnInit() {
    
  }

  consultarHistorialMedico () {
        
  }

  guardar () {
    if (this.formPaciente.tipoPaciente == '1') {
      
    } else {
      
    }
    
  }
}
