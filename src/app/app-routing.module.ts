import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { AuthGuard } from './core/auth.guard';
import { InventarioComponent } from './componentes/inventario/inventario.component';
import { AtenderComponent } from './componentes/atender/atender.component';
import { ConsultarHistorialComponent } from './componentes/consultar-historial/consultar-historial.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'atender', component: AtenderComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'inventario', component: InventarioComponent, canActivate: [AuthGuard]},
  {path: 'consultarPaciente', component: ConsultarHistorialComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
