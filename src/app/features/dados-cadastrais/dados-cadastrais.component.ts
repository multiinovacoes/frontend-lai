import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Manifestante } from 'src/app/core/models/manifestante.model';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { UtilService } from 'src/app/util.service';
import { RegisterService } from '../register-user/register-user.service';
import { DadosCadastraisService } from './dados-cadastrais.service';

@Component({
  selector: 'app-dados-cadastrais',
  templateUrl: './dados-cadastrais.component.html',
  styleUrls: ['./dados-cadastrais.component.css']
})
export class DadosCadastraisComponent implements OnInit {

  name: string;

  emailId: string;

  password: string;

  version: string;

  manifestante = new Manifestante();

  tipoDocumentos!: any;

  origensContato!: any;

  ufs!: any;

  mascaraCPF = true;
  mascaraCNPJ = true;
  mascara = false;

  constructor( 
    private messageService: MessageService,
    private loaderService: LoaderService,
    private router: Router,
    private errorHandler: ErrorHandlerService,
    private routeStateService: RouteStateService,
    private utilService: UtilService,
    private dadosCadastraisService: DadosCadastraisService,
    private register: RegisterService) {


     }

  ngOnInit() {
    this.listaTiposDocumento();
    this.mascaraCPF = true;
    this.mascaraCNPJ = true;
    this.mascara = false;
    this.ufs = this.utilService.listaUfs();
    this.listaOrigemContato();
    this.dadosCadastraisService.editar()
    .then(response => {
      this.manifestante = response;
      this.manifestante.confirmaDados = true;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  onMascara() {
    this.manifestante.numeroDocumento = "";
    if (this.manifestante.codigoDocumento == 1){
      this.mascaraCPF = false;
      this.mascaraCNPJ = true;
      this.mascara = true;
    }else if (this.manifestante.codigoDocumento == 7){
        this.mascaraCPF = true;
        this.mascaraCNPJ = false;
        this.mascara = true;
    }else{
        this.mascaraCPF = true;
        this.mascaraCNPJ = true;
        this.mascara = false;
      }
    }

    onTipoPessoaFisica() {
      this.listaTiposDocumentoPessoaFisica();
  }

  onTipoPessoaJuridica() {
      this.listaTiposDocumentoPessoaJuridica();
  }

  listaTiposDocumentoPessoaFisica(): any[]{
    this.tipoDocumentos = [
      { label: 'CPF', value: 1 },
      { label: 'RG', value: 2 },
      { label: 'CNH', value: 3 },
      { label: 'Passaporte', value: 4 },
      { label: 'Carteira de Identidade Indígena', value: 5 },
      { label: 'Certidão de Nascimento', value: 6 },
    ];
    return this.tipoDocumentos;
  }

  listaTiposDocumentoPessoaJuridica(): any[]{
    this.tipoDocumentos = [
      { label: 'CNPJ', value: 7 }
    ];
    return this.tipoDocumentos;
  }


  salvar(form: NgForm) {
    this.manifestante.telefone = form.value.telefone;
    this.dadosCadastraisService.atualizar(this.manifestante)
    .then(response => {
      this.manifestante = response.manifestanteDto;
      this.manifestante.confirmaDados = true;
      this.messageService.add({ severity: 'success', detail: 'Dados atualizados com sucesso!' });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  onClickGoToLogin() {
    this.router.navigate(['/login']);
  }


  listaTiposDocumento(): any[]{
    this.tipoDocumentos = [
      { label: 'CPF', value: 1 },
      { label: 'RG', value: 2 },
      { label: 'Passaporte', value: 3 }
    ];
    return this.tipoDocumentos;
  }

  listaOrigemContato(): any[]{
    this.origensContato = [
      { label: 'Site', value: 1 },
      { label: 'Email', value: 2 },
      { label: 'Presencial', value: 3 },
      { label: 'Telefone', value: 4 },
      { label: 'Carta', value: 5 }
    ];
    return this.origensContato;
  }


}
