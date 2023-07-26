import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoComponent } from './pedido.component';
import { AppCommonModule } from 'src/app/app.common.module';
import { PedidoRoutingModule } from './pedido.routing';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';



@NgModule({
  declarations: [PedidoComponent],
  imports: [
    CommonModule,
    AppCommonModule,
    PedidoRoutingModule,
    HeaderBreadCrumbModule
  ]
})
export class PedidoModule { }
