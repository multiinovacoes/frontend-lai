import { SessionService } from 'src/app/core/services/session.service';
import { User } from 'src/app/core/models/user.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Manifestante } from 'src/app/core/models/manifestante.model';


@Injectable({
    providedIn: 'root',
})
export class RegisterService {

  registerUrl: string;
  user: User;
  headers = new HttpHeaders()

  constructor(
    private http: HttpClient
//    private sessionService: SessionService
  ) {
    this.registerUrl = `${environment.apiUrl}/manifestante`;
    this.carregaToken();
  }

  carregaToken(){
    this.headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
    .append('Authorization', 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjM5MDY2NzEsInVzZXJfbmFtZSI6ImNvbmVjdGEiLCJqdGkiOiJsQUlwR25xNlU4NGltUzlMSTcyTnRWQ0RtYVEiLCJjbGllbnRfaWQiOiJhbmd1bGFyIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.WhHNh4p3RE6rYDgeampCHqZ_3qD3a6F2M2FKrqUJScI')
   }


    registrar(manifestante: Manifestante): Promise<Manifestante> {
      return this.http.post<Manifestante>(`${this.registerUrl}`, manifestante, { headers: this.headers })
        .toPromise();
    }

}
