import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CoordenadoriaComponent } from './coordenadoria/coordenadoria.component';

import { DescricaodaacaoComponent } from './descricaodaacao/descricaodaacao.component';
import { ProdutoagricolaComponent } from './produtoagricola/produtoagricola.component';
import { EnvolvidosComponent } from './envolvidos/envolvidos.component';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';


import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { ThemePalette } from '@angular/material/core';
import { MatCommonModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FiscalizadoComponent } from './fiscalizado/fiscalizado.component';
import { HttpService } from './Services/http.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    CoordenadoriaComponent,
    DescricaodaacaoComponent,
    ProdutoagricolaComponent,
    EnvolvidosComponent,
    FiscalizadoComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatCommonModule,
    MatRadioModule,
    MatAutocompleteModule,
    HttpClientModule,
   



  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
