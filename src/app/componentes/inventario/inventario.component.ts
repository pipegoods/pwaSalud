import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatPaginator, MatBottomSheetRef, MatBottomSheet} from '@angular/material';

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

  constructor(private bottomSheet: MatBottomSheet){}

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  openBottomSheet(): void {
    this.bottomSheet.open(BottomSheetOverviewExampleSheet);
  }

}

@Component({
  selector: 'bottom-sheet-overview-example-sheet',
  templateUrl: 'newmedicamento.modal.html',
})
export class BottomSheetOverviewExampleSheet {
  constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>) {}

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}