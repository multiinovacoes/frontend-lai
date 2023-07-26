import { DadosCadastraisModule } from './features/dados-cadastrais/dados-cadastrais.module';
import { PedidoModule } from './features/pedido/pedido.module';
import { PedidoCadastroModule } from './features/pedido-cadastro/pedido-cadastro.module';
import { RecursoModule } from './features/recurso/recurso.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/core/gaurds/auth.gaurd';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { ErrorComponent } from './shared/error/error.component';

const appRoutes: Routes = [
    {
        path: 'login',
        loadChildren: () => import('src/app/features/login/login.module').then(m => m.LoginModule)
    },
    {
        path: 'register',
        loadChildren: () => import('src/app/features/register-user/register-user.module').then(m => m.RegisterUserModule)
    },
    {
        path: 'main',
        component: LayoutComponent,
        children: [
        {
            path: 'dashboard',
            loadChildren: () => import('src/app/features/dashboard/dashboard.module').then(m => m.DashboardModule),
            canActivate: [AuthGuard]
        },
        {
          path: 'dados-cadastrais',
          loadChildren: () => import('src/app/features/dados-cadastrais/dados-cadastrais.module').then(m => m.DadosCadastraisModule),
          canActivate: [AuthGuard]
        },        
        {
          path: 'pedido',
          loadChildren: () => import('src/app/features/pedido/pedido.module').then(m => m.PedidoModule),
          canActivate: [AuthGuard]
        },        
        {
          path: 'pedido-cadastro',
          loadChildren: () => import('src/app/features/pedido-cadastro/pedido-cadastro.module').then(m => m.PedidoCadastroModule),
          canActivate: [AuthGuard]
        },        
        {
          path: 'recurso',
          loadChildren: () => import('src/app/features/recurso/recurso.module').then(m => m.RecursoModule),
          canActivate: [AuthGuard]
        }]
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
