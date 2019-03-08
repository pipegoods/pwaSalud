import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { PacienteService } from 'src/app/core/paciente.service';
import { Estudiante } from 'src/app/modelos/estudiante.model';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RegistroMedico } from 'src/app/modelos/registro-medico.model';
import { HistorialMedico } from 'src/app/modelos/historial-medico.model';
import { Empleado } from 'src/app/modelos/empleo.model';

@Component({
  selector: 'app-consultar-historial',
  templateUrl: './consultar-historial.component.html',
  styleUrls: ['./consultar-historial.component.css']
})
export class ConsultarHistorialComponent implements OnInit {
  private listaEstudiantes :any;
  private listaEmpleados :any;
  private in = 0;
  private in2 = 0;
  private historialMedico_aux : any;
  private registro : any;

  dataSource: MatTableDataSource<Estudiante>;
  dataSourceEmpleado : MatTableDataSource<Empleado>;

  displayedColumns: string[] = ['documento', 'nombre', 'codigo', 'programa', 'semestre', 'acciones'];
  displayedColumnsEmpleado: string[] = ['documento', 'nombre', 'cargo', 'estamento', 'acciones'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private pacienteService : PacienteService,
    public dialog: MatDialog) {
    
    this.initFuncion();
   }

  initFuncion () {
    this.historialMedico_aux = new HistorialMedico();
    this.listaEstudiantes = Array<Estudiante>();
    this.listaEmpleados = Array<Empleado>();
    this.in = 0;
    this.in2 = 0;
    this.pacienteService.getListaEstudiantes().subscribe((d)=>{
      console.log(d);
      
      d.forEach((dato : {codigo, programa, semestre, nombre, documento}) => {
        this.listaEstudiantes.push(new Estudiante (
          dato.codigo, dato.programa, dato.semestre, dato.nombre, dato.documento
        ));
        this.pacienteService.consultarHistorialMedico(dato.documento, 1).subscribe((resultado)=>{
          this.historialMedico_aux = new HistorialMedico();
          console.log(resultado);
          resultado.forEach((d : {diagnostico , fecha_registro, observaciones}) => {
            console.log(d);
            this.registro = new RegistroMedico(d.diagnostico, d.fecha_registro, d.observaciones);
            this.historialMedico_aux.agregarRegistroMedico(this.registro);
          });
          this.listaEstudiantes[this.in].setHistorial = this.historialMedico_aux;
          console.log(this.listaEstudiantes[this.in]);
          
          this.in += 1;
        });
        
      });
      this.dataSource = new MatTableDataSource(this.listaEstudiantes);
      console.log(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });


    this.pacienteService.getListaEmpleado().subscribe((d)=>{
      console.log(d);
      
      d.forEach((dato : {cargo, estamento, nombre, documento}) => {
        this.listaEmpleados.push(new Empleado (
          dato.cargo, dato.estamento, dato.nombre, dato.documento
        ));
        this.pacienteService.consultarHistorialMedico(dato.documento, 2).subscribe((resultado)=>{
          this.historialMedico_aux = new HistorialMedico();
          console.log(resultado);
          resultado.forEach((d : {diagnostico , fecha_registro, observaciones}) => {
            console.log(d);
            this.registro = new RegistroMedico(d.diagnostico, d.fecha_registro, d.observaciones);
            this.historialMedico_aux.agregarRegistroMedico(this.registro);
          });
          this.listaEmpleados[this.in2].setHistorial = this.historialMedico_aux;
          console.log(this.listaEmpleados[this.in2]);
          
          this.in2 += 1;
        });
        
      });
      this.dataSourceEmpleado = new MatTableDataSource(this.listaEmpleados);
      console.log(this.dataSourceEmpleado);
      this.dataSourceEmpleado.paginator = this.paginator;
      this.dataSourceEmpleado.sort = this.sort;
    });
  }
  ngOnInit() {
    
  }
  
  openDialog(documento, tipo): void {
    let aux : any;
    if (tipo == 1) {
      aux = this.listaEstudiantes.find(function(es) {
        return es.documento === documento;
      });
    } else {
      aux = this.listaEmpleados.find(function(es) {
        return es.documento === documento;
      });
    }
    
    
    
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '500px',
      data: {name: aux.getNombre, historial: aux.getHistorial}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  applyFilterEstudiante(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilterEmpleado(filterValue: string) {
    this.dataSourceEmpleado.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceEmpleado.paginator) {
      this.dataSourceEmpleado.paginator.firstPage();
    }
  }

  desactivarPaciente(documento, tipo){
    let aux : any;
    if (tipo == 1) {
      aux = this.listaEstudiantes.find(function(es) {
        return es.documento === documento;
      });
    } else {
      aux = this.listaEmpleados.find(function(es) {
        return es.documento === documento;
      });
    }
    
    this.pacienteService.eliminarPacienteLista(documento, tipo).then((d)=>{
      console.log(d);
      this.initFuncion();
    }).catch((r)=>{
      console.log(r);
      this.initFuncion();
    });

    this.pacienteService.agregarPacienteDesactivado(aux,tipo).then((d)=>{
      console.log(d);
    }).catch((r)=>{
      console.log(r);
    });

    this.pacienteService.agregarRegistroMedicoDesactivado(aux, tipo).then((d)=>{
      console.log(d);
    }).catch((r)=>{
      console.log(r);
    });

    this.pacienteService.consultarHistorialMedico(aux.getDocumento, tipo).subscribe((dato) => {
      dato.forEach((d : {id})=>{
        console.log(d);
        
        this.pacienteService.eliminarHistorialPaciente(aux.getDocumento, tipo, d.id);
      });
    })
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'historialmedico.modal.html',
  styleUrls: ['historialmedico.modal.css']
})
export class DialogOverviewExampleDialog {
  dataSource: MatTableDataSource<RegistroMedico>;
  displayedColumns: string[] = ['fecha', 'diagnostico','observaciones'];
  private showTable = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data) {
      if (data.historial.getRegistrosMedicos.length) {
        this.showTable = true; 
      }
      this.dataSource = new MatTableDataSource(data.historial.getRegistrosMedicos);
      console.log(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
