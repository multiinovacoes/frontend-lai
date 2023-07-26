import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecursoComponent } from './recurso.component';
import { AppCommonModule } from 'src/app/app.common.module';
import { HeaderBreadCrumbModule } from 'src/app/shared/layout/header-breadcrumb/header-breadcrumb.module';
import { RecursoRoutingModule } from './recurso.routing';



@NgModule({
  declarations: [RecursoComponent],
  imports: [
    CommonModule,
    AppCommonModule,
    RecursoRoutingModule,
    HeaderBreadCrumbModule
  ]
})
export class RecursoModule { }
