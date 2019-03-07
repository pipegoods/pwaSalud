import { Component, OnInit, ViewChild } from '@angular/core';
import { PacienteService } from 'src/app/core/paciente.service';
import { Estudiante } from 'src/app/modelos/estudiante.model';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-consultar-historial',
  templateUrl: './consultar-historial.component.html',
  styleUrls: ['./consultar-historial.component.css']
})
export class ConsultarHistorialComponent implements OnInit {
  private listaEstudiantes :any;
  dataSource: MatTableDataSource<Estudiante>;
  displayedColumns: string[] = ['documento', 'nombre', 'codigo', 'programa', 'semestre'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private pacienteService : PacienteService) {
    this.listaEstudiantes = Array<Estudiante>;
    this.pacienteService.getListaEstudiantes().subscribe((d)=>{
      console.log(d);
      d.forEach((dato : {codigo, programa, semestre, nombre, documento}) => {
        this.listaEstudiantes.push(new Estudiante (
          dato.codigo, dato.programa, dato.semestre, dato.nombre, dato.documento
        ));
      });
      this.dataSource = new MatTableDataSource(this.listaEstudiantes);
      console.log(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
   }
  
  ngOnInit() {
    
  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

