import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Anexo } from 'src/app/core/models/anexo.model';
import { Manifestante } from 'src/app/core/models/manifestante.model';
import { Pedido } from 'src/app/core/models/pedido.model';
import { User } from 'src/app/core/models/user.model';
import { SessionService } from 'src/app/core/services/session.service';
import { environment } from 'src/environments/environment';


export class PedidoFilter {
  descricao!: string;
  numero!: string;
}

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  pedidoUrl: string;
  user: User;
  anexoUrl: string;

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) { 
    this.pedidoUrl = `${environment.apiUrl}/atendimentos`;
    this.anexoUrl = `${environment.apiUrl}/anexos`;
  }


  registrar(pedido: Pedido): Promise<Pedido> {
    return this.http.post<Pedido>(`${this.pedidoUrl}`, pedido)
      .toPromise();
  }

  editar(): Promise<Pedido>{
    this.user = this.sessionService.getItem("currentUser");
    return this.http.get<any>(`${this.pedidoUrl}/editar`)
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.manifestanteDto;
     });
  }

  listarManifestacoes(): Promise<any> {
    return this.http.get<any>(`${this.pedidoUrl}/consultaAtendimento`)
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.atendimentoDtoList;
     });
  }    

  listarManifestacoesConcluidas(): Promise<any> {
    return this.http.get<any>(`${this.pedidoUrl}/consulta-atendimento-concluido`)
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.atendimentoDtoList;
     });
  }    


  editarAtendimento(codigo: number): Promise<any>{
    let params = new HttpParams()
    params = params.set('codigo', codigo.toString());
    return this.http.get<any>(`${this.pedidoUrl}/${codigo}`)
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.atendimentoDto;
     });
  }


  pesquisaPedido(pedidoFilter: PedidoFilter): Promise<any>{
    let params = new HttpParams()
    if (pedidoFilter.numero) {
      params = params.set('numeroProtocolo', pedidoFilter.numero);
    }
    if (pedidoFilter.descricao) {
      params = params.set('descricao', pedidoFilter.descricao);
    }
    
 return this.http.get<any>(`${this.pedidoUrl}/pesquisar-pedido?`, { params })
 .toPromise()
  .then(res => <any>res)
      .then(data => {
        return data;
  });
}

listar(codigoAtendimento: any): Promise<any> {
  let params = new HttpParams();
  params = params.set("codigoAtendimento", codigoAtendimento);

  return this.http
    .get<any>(`${this.anexoUrl}/listar?`, { params })
    .toPromise()
    .then((res) => <any>res)
    .then((data) => {
      return data.anexoDtoList;
    });
}

adicionar(anexo: Anexo): Promise<Anexo> {
  return this.http.post<Anexo>(`${this.anexoUrl}`, anexo).toPromise();
}

excluir(codigo: number): Promise<void> {
  return this.http
    .delete(`${this.anexoUrl}/${codigo}`)
    .toPromise()
    .then(() => null);
}

}
