import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoCadastroRoutingModule } from './pedido-cadastro.routing';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { PedidoCadastroComponent } from './pedido-cadastro.component';



@NgModule({
  imports: [
    CommonModule,
    PedidoCadastroRoutingModule,
    AppCommonModule,
    HeaderBreadCrumbModule,
    CKEditorModule
  ],
  declarations: [
    PedidoCadastroComponent  ]
})
export class PedidoCadastroModule { }
