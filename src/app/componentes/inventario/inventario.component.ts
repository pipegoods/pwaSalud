import {Component, OnInit, ViewChild, Inject} from '@angular/core';
import {MatTableDataSource, MatPaginator, MatBottomSheetRef, MatBottomSheet, MAT_BOTTOM_SHEET_DATA} from '@angular/material';
import { AuthService } from 'src/app/core/auth.service';

export interface PeriodicElement {
  Nombre: string;
  ID: number;
  pres: string;
  cant: number;
  fven: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {ID: 1, Nombre: 'Dolex', pres: "Pastillas", cant: 5, fven: Date.now()},
  {ID: 2, Nombre: 'Cocaina', pres: "Polvo", cant: 5, fven: Date.now()},
  {ID: 3, Nombre: 'Bazuco', pres: "Polvo", cant: 5, fven: Date.now()},
  {ID: 4, Nombre: 'Galezo', pres: "Humana", cant: 5, fven: Date.now()}
];



@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  displayedColumns: string[] = ['Nombre', 'Presentacion', 'Cantidad', 'Fecha vencimiento',"acciones"];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private bottomSheet: MatBottomSheet,
    private aauth: AuthService){}

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  openBottomSheet(): void {
    this.bottomSheet.open(BottomSheetExampleSheet, {
      data: { 
        datos:{
          Nombre: '',
          pres: '',
          cant: '',
          fven: ''

        }
       },
    });
  }

  editMed(id) {
    var datos =  ELEMENT_DATA.find(function(element) {
      return element.ID == id;
    });
    
    this.bottomSheet.open(BottomSheetExampleSheet, {
      data: { 
        datos
       },
    });
  }

  getSede(sede) {
    switch (sede) {
      case 'piedra-Bolivar':
        return 'Pierdra de Bolivar';
        break;
      case 'san-Pablo':
        return 'San pablo';
        break;
      case 'san-Agustin':
        return 'San agustin';
        break;
      case 'zaragocilla':
        return 'Zaragocilla';
        break;
      default:
        return 'Sede invalida'
        break;
    }
    
  }
}

@Component({
  selector: 'bottom-sheet-overview',
  templateUrl: 'newmedicamento.modal.html',
  styleUrls: ['./inventario.component.css']
})
export class BottomSheetExampleSheet {
  constructor(private bottomSheetRef: MatBottomSheetRef,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
      console.log(data.datos);
    }
  
    
  
}