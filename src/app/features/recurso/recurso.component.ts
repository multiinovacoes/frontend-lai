import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { PedidoFilter, PedidoService } from '../pedido/pedido.service';

@Component({
  selector: 'app-recurso',
  templateUrl: './recurso.component.html',
  styleUrls: ['./recurso.component.css']
})
export class RecursoComponent implements OnInit {

  pedidoFilter = new PedidoFilter();

  atendimentos = [];
  atendimento!: any;
  @ViewChild('tabela') grid: Table;


  constructor(
    private routeStateService: RouteStateService,
    private pedidoService: PedidoService,
    private errorHandler: ErrorHandlerService,

  ) { }

  ngOnInit(): void {
    this.pedidoService.listarManifestacoesConcluidas()
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

  editarPedido(codigo: number) {
    this.routeStateService.add('Visualização de Pedido',
      '/main/pedido-cadastro', codigo, false);
  }



}
