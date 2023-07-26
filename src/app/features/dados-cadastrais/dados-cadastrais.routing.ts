import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DadosCadastraisComponent } from './dados-cadastrais.component';

const routes: Routes = [
    {
        path: '',
        component: DadosCadastraisComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DadosCadastraisRoutingModule { }
