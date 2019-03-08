import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import {MatTableDataSource, MatPaginator, MatBottomSheetRef, MatBottomSheet, MAT_BOTTOM_SHEET_DATA, MatSort} from '@angular/material';
import { AuthService } from 'src/app/core/auth.service';
import { InventarioService } from 'src/app/core/inventario.service';
import { Enfermeria } from 'src/app/modelos/enfermeria.model';
import { InventarioMedicamento } from 'src/app/modelos/inventario-medicamento.model';
import { Medicamento } from 'src/app/modelos/medicamento.model';
import { Timestamp } from 'rxjs/internal/operators/timestamp';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  private enfermeria_aux : Enfermeria;
  displayedColumns: string[] = ['Nombre', 'Presentacion', 'Cantidad', 'Fecha vencimiento',"acciones"];
  dataSource : MatTableDataSource<Medicamento>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private bottomSheet: MatBottomSheet,
    public aauth: AuthService,
    private inventarioService : InventarioService) {
      
      
    

    }

    ngOnInit() {
    
      this.aauth.user.subscribe((d)=>{
        this.enfermeria_aux = new Enfermeria(new InventarioMedicamento([]), [], d.sede);
          this.inventarioService.getMedicamentosInventario(d.sede).subscribe((med)=>{

            
            med.forEach((m : {cantidad, nombre, presentacion, vencimiento}) => {
              
              this.enfermeria_aux.getInventarioMedicamento.agregarMedicamento(
                new Medicamento(m.cantidad, m.nombre, m.presentacion, m.vencimiento)
              );
            });
          });
          this.dataSource = new MatTableDataSource(this.enfermeria_aux.getInventarioMedicamento.getMedicamentos);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
       });
      
    }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  cargar () {
    this.applyFilter('0');
  }

  openBottomSheet(): void {
    this.bottomSheet.open(BottomSheetExampleSheet, {
      data: { 
        datos:{
          getNombre: '',
          getCantidad: '',
          getPresentacion: '',
          getVencimiento: this.enfermeria_aux.getInventarioMedicamento.getMedicamentos[0].getVencimiento

        },
        tipo : 'nuevo'
       },
    }).afterDismissed().subscribe((datos : {getCantidad, getNombre, getPresentacion, getVencimiento}) => {
      if (!(datos===undefined)) {
        
        this.enfermeria_aux.getInventarioMedicamento.agregarMedicamento(new Medicamento(datos.getCantidad, datos.getNombre, datos.getPresentacion, datos.getVencimiento));
        this.inventarioService.agregarMedicamento(this.enfermeria_aux.getSede, new Medicamento(datos.getCantidad, datos.getNombre, datos.getPresentacion, datos.getVencimiento)).then((f)=>{
          this.ngOnInit();
        });
      } else {
        
      }

    });
  }

  editMed(id) {
    var datos =  this.enfermeria_aux.getInventarioMedicamento.getMedicamentos.find(function(element) {
      return element.getNombre == id;
    });

    this.bottomSheet.open(BottomSheetExampleSheet, {
      data: { 
        datos, tipo: 'editar'
       },
    }).afterDismissed().subscribe((datos) => {
      if (!(datos===undefined)) {
        // this.enfermeria_aux.getInventarioMedicamento.agregarMedicamento(datos);
        // this.inventarioService.agregarMedicamento(this.enfermeria_aux.getSede, new Medicamento(datos.getCantidad, datos.getNombre, datos.getPresentacion, datos.getVencimiento)).then((f)=>{
        //   this.ngOnInit();
        // });
        // this.inventarioService.modificarMedicamento(this.enfermeria_aux.getSede, datos).subscribe((dat)=>{
        //   id = dat.docs[0].id;
        //   this.inventarioService.setMedicamento(this.enfermeria_aux.getSede, datos, id).then((d)=>{
            
        //   });
        // });
        this.enfermeria_aux.getInventarioMedicamento.modificarCantidadMedicamento(datos);
      } else {
        
      }
    });

  }

  getSede(sede) {
    switch (sede) {
      case 'PiedraBolivar':
        return 'Pierdra de Bolivar';
        break;
      case 'SanPablo':
        return 'San pablo';
        break;
      case 'SanAgustin':
        return 'San agustin';
        break;
      case 'Zaragocilla':
        return 'Zaragocilla';
        break;
      default:
        return 'Sede invalida'
        break;
    }
    
  }

  retirarMedicamento (nombre) {
    var r = confirm("Estas seguro que deseas retirar el medicamento?");
    if (r == true) {
      var datos =  this.enfermeria_aux.getInventarioMedicamento.getMedicamentos.find(function(element) {
        return element.getNombre == id;
      });
      let id : string;
      this.inventarioService.modificarMedicamento(this.enfermeria_aux.getSede, nombre).subscribe((dat)=>{
          id = dat.docs[0].id;
          this.inventarioService.retirarMedicamento(this.enfermeria_aux.getSede, id).then((d)=>{
            this.enfermeria_aux.getInventarioMedicamento.retirarMedicamento(datos); 
            this.ngOnInit();  
          });
          this.ngOnInit();
        });
    }    
    
  }
}

@Component({
  selector: 'bottom-sheet-overview',
  templateUrl: 'newmedicamento.modal.html',
  styleUrls: ['./inventario.component.css']
})
export class BottomSheetExampleSheet {
  minDate = new Date();
  constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetExampleSheet>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private inventarioService : InventarioService) {
    }
  
    
    onNoClick(): void {
      
      this.bottomSheetRef.dismiss();
    }
    
    
    crearMedicamento() {
      this.bottomSheetRef.dismiss(this.data.datos);
    }

    modificarCantidadMedicamento( ) {
      this.bottomSheetRef.dismiss(this.data.datos);
    }
}