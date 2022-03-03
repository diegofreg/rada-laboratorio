import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoordenadoriaComponent } from './coordenadoria/coordenadoria.component';
import { DescricaodaacaoComponent } from './descricaodaacao/descricaodaacao.component';
import { EnvolvidosComponent } from './envolvidos/envolvidos.component';
import { FiscalizadoComponent } from './fiscalizado/fiscalizado.component';


const routes: Routes = [

{path: 'coordenadoria', component:CoordenadoriaComponent},
{path: 'descricaodaacao', component:DescricaodaacaoComponent},
{path:'envolvidos', component:EnvolvidosComponent},
{path:'fiscalizado', component:FiscalizadoComponent},

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
