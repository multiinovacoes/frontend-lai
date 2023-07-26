import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DadosCadastraisRoutingModule } from './dados-cadastrais.routing';
import { HeaderBreadCrumbModule } from './../../shared/layout/header-breadcrumb/header-breadcrumb.module';
import { AppCommonModule } from 'src/app/app.common.module';
import { DadosCadastraisComponent } from './dados-cadastrais.component';



@NgModule({
  declarations: [DadosCadastraisComponent],
  imports: [
    CommonModule,
    AppCommonModule,
    DadosCadastraisRoutingModule,
    HeaderBreadCrumbModule
  ]
})
export class DadosCadastraisModule { }
