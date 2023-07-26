import { ErrorHandlerService } from './core/services/error-handler.service';
import { Injectable } from '@angular/core';


import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(
    private errorHandler: ErrorHandlerService
  ) { }
  ufs = [];
  statusAtendimento = [];


  listaStatusAtendimento(): any[]{
    this.statusAtendimento = [
      { label: 'Pedido Aberto', value: 0},
      { label: 'Pedido em andamento', value: 1},
      { label: 'Pedido resolvido', value: 2},
      { label: 'Pedido Cancelado', value: 3}
    ]
    return this.statusAtendimento;
  }

  listaUfs(): any[]{
    this.ufs = [
      { label: 'Acre', value: 'AC'},
      { label: 'Alagoas', value: 'AL'},
      { label: 'Amazonas', value: 'AM'},
      { label: 'Amapá', value: 'AP'},
      { label: 'Bahia', value: 'BA'},
      { label: 'Ceará', value: 'CE'},
      { label: 'Distrito Federal', value: 'DF'},
      { label: 'Espírito Santo', value: 'ES'},
      { label: 'Goias', value: 'GO'},
      { label: 'Maranhão', value: 'MA'},
      { label: 'Minas Gerais', value: 'MG'},
      { label: 'Mato Grosso do Sul', value: 'MS'},
      { label: 'Mato Grosso', value: 'MT'},
      { label: 'Pará', value: 'PA'},
      { label: 'Paraíba', value: 'PB'},
      { label: 'Pernambuco', value: 'PE'},
      { label: 'Piaui', value: 'PI'},
      { label: 'Paraná', value: 'PR'},
      { label: 'Rio de Janeiro', value: 'RJ'},
      { label: 'Rio Grande do Norte', value: 'RN'},
      { label: 'Rondônia', value: 'RO'},
      { label: 'Rio Grande do Sul', value: 'RS'},
      { label: 'Santa Catarina', value: 'SC'},
      { label: 'Sergipe', value: 'SE'},
      { label: 'São Paulo', value: 'SP'},
      { label: 'Tocantins', value: 'TO'},
      { label: 'Roraima', value: 'RR'}
    ];
    return this.ufs;
  }



  public converterStringsParaDatas(data: string): Date {
    return moment(data,
      'YYYY-MM-DD').toDate();
  }

  public formataData(data: Date): string {
    return moment(data, "YYYY-MM-DD").format('DD/MM/YYYY');
  }




}
