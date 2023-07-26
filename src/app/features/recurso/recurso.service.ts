import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Anexo } from 'src/app/core/models/anexo.model';
import { Manifestante } from 'src/app/core/models/manifestante.model';
import { Pedido } from 'src/app/core/models/pedido.model';
import { Recurso } from 'src/app/core/models/recurso.model';
import { User } from 'src/app/core/models/user.model';
import { SessionService } from 'src/app/core/services/session.service';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class RecursoService {

  recursoUrl: string;
  user: User;

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) { 
    this.recursoUrl = `${environment.apiUrl}/recurso`;
  }


  registrar(recurso: Recurso): Promise<Recurso> {
    return this.http.post<Recurso>(`${this.recursoUrl}`, recurso)
      .toPromise();
  }


  editarRecurso(codigo: number): Promise<any>{
    let params = new HttpParams()
    params = params.set('codigo', codigo.toString());  
    return this.http.get<any>(`${this.recursoUrl}/${codigo}`)
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.recursoDto;
     });
  }


  autorizaRecurso(codigoPedido: any): Promise<any>{
    let params = new HttpParams()
    params = params.set('codigoPedido', codigoPedido);
    return this.http.get<any>(`${this.recursoUrl}/autoriza-recurso/${codigoPedido}`)
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.recursoDto;
     });
  }


 

listar(idPedido: any): Promise<any> {
  let params = new HttpParams();
  params = params.set("idPedido", idPedido);

  return this.http
    .get<any>(`${this.recursoUrl}/listar?`, { params })
    .toPromise()
    .then((res) => <any>res)
    .then((data) => {
      return data.anexoDtoList;
    });
}


}
