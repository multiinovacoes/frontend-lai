import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Manifestante } from 'src/app/core/models/manifestante.model';
import { User } from 'src/app/core/models/user.model';
import { SessionService } from 'src/app/core/services/session.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DadosCadastraisService {

  manifestanteUrl: string;
  user: User;

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) { 
    this.manifestanteUrl = `${environment.apiUrl}/manifestante`;
  }


  editar(): Promise<Manifestante>{
    this.user = this.sessionService.getItem("currentUser");
    return this.http.get<any>(`${this.manifestanteUrl}/editar`)
    .toPromise()
     .then(res => <any>res)
         .then(data => {
           return data.manifestanteDto;
     });
  }

  atualizar(manifestante: Manifestante): Promise<Manifestante> {
    return this.http.put<Manifestante>(`${this.manifestanteUrl}`, manifestante)
      .toPromise();
  }
}
