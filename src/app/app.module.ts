import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './componentes/home/home.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatSelectModule, MatNativeDateModule, MatTabsModule, MatTooltipModule } from '@angular/material';
import { AtenderComponent } from './componentes/atender/atender.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatRadioModule} from '@angular/material/radio';
import { InventarioComponent } from './componentes/inventario/inventario.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {BottomSheetExampleSheet} from './componentes/inventario/inventario.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FlexLayoutModule } from '@angular/flex-layout';
import { MenuPacienteComponent } from './componentes/menu-paciente/menu-paciente.component';
import { ConsultarHistorialComponent, DialogOverviewExampleDialog } from './componentes/consultar-historial/consultar-historial.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MenuPrincipalComponent,
    AtenderComponent,
    InventarioComponent,
    BottomSheetExampleSheet,
    MenuPacienteComponent,
    ConsultarHistorialComponent,
    DialogOverviewExampleDialog
  ],
  imports: [
    BrowserModule,
    MatNativeDateModule, MatDatepickerModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule, AngularFirestoreModule, LayoutModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule,
    MatInputModule,FlexLayoutModule, FormsModule, MatSelectModule, MatCardModule, MatGridListModule,MatRadioModule,MatTableModule, MatPaginatorModule, MatBottomSheetModule,
    AngularFirestoreModule.enablePersistence(), MatTabsModule,MatTooltipModule
  ],entryComponents: [
    BottomSheetExampleSheet,
    DialogOverviewExampleDialog
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
