import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';
import { RouteStateService } from 'src/app/core/services/route-state.service';




@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  msgs: any[];


  constructor(
    private routeStateService: RouteStateService
  ) {
   
    this.msgs = [];
  }

  ngOnInit() {
  } 

  registrarPedido(){
    this.routeStateService.add('Dados Cadastrais',
    '/main/pedido-cadastro', null, false);
  }

  consultarPedido(){
    this.routeStateService.add('Dados Cadastrais',
    '/main/pedido', null, false);
  }
  
  consultarRecurso(){
    this.routeStateService.add('Dados Cadastrais',
    '/main/recurso', null, false);
  }

  dadosCadastrais(){
    this.routeStateService.add('Dados Cadastrais',
    '/main/dados-cadastrais', null, false);
  }

}




