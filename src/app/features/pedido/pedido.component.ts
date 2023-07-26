import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { PedidoFilter, PedidoService } from './pedido.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  atendimentos = [];
  atendimento!: any;
  @ViewChild('tabela') grid: Table;

  pedidoFilter = new PedidoFilter();

  constructor(
    private routeStateService: RouteStateService,
    private pedidoService: PedidoService,
    private errorHandler: ErrorHandlerService,

  ) { }

  ngOnInit(): void {
    this.pedidoService.listarManifestacoes()
    .then(response => {
      this.atendimentos = response;
    })
    .catch(erro => this.errorHandler.handle(erro));
    
  }

  pesquisa() {
    this.pedidoService.pesquisaPedido(this.pedidoFilter)
      .then(response => {
        this.atendimentos = response.atendimentoDtoList;
      
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novoPedido(){
    this.routeStateService.add('Cadastrar Pedido de Informação',
    '/main/pedido-cadastro', null, false);
  }

  editarPedido(codigo: number) {
    this.routeStateService.add('Visualização de Pedido',
      '/main/pedido-cadastro', codigo, false);
  }

  

}
