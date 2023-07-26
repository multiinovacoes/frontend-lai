import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Atendimento } from 'src/app/core/models/atendimento.model';
import { Anexo } from 'src/app/core/models/anexo.model';
import { Pedido } from 'src/app/core/models/pedido.model';
import { User } from 'src/app/core/models/user.model';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { SessionService } from 'src/app/core/services/session.service';
import { PedidoService } from '../pedido/pedido.service';

import Swal from "sweetalert2/dist/sweetalert2.js";
import { LoaderService } from 'src/app/core/services/loader.service';
import { format } from 'path';
import { UtilService } from 'src/app/util.service';
import { RecursoService } from '../recurso/recurso.service';
import { Recurso } from 'src/app/core/models/recurso.model';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-pedido-cadastro',
  templateUrl: './pedido-cadastro.component.html',
  styleUrls: ['./pedido-cadastro.component.css']
})
export class PedidoCadastroComponent implements OnInit {


  pedido = new Pedido();

  recurso = new Recurso();

  showLoaderDialog = false;

  user: User;

  listaInstituicoes!: any;

  listaAreas!: any;

  lista!: any;

  recursos = [];
  @ViewChild('tabela') grid: Table;

  listaStatusAtendimento!: any;

  atendimento = new Atendimento();

  headerRecurso = "";

  displayModal: boolean;
  displayModalRecurso: boolean;
  fileName = "";
  uploadedFiles: any[] = [];
  fileSelected?: File;
  base64: string = "Base64...";
  anexo = new Anexo();
  anexos!: any;
  idAnexoSelecao: any;
  @ViewChild("myFormAnexo", { static: false }) myFormAnexo: NgForm;
  @ViewChild('fileUpload') fileUpload: any;


  constructor(
    private sessionService: SessionService,
    private pedidoService: PedidoService,
    private loaderService: LoaderService,
    private utilService: UtilService,
    private recursoService: RecursoService,
    private messageService: MessageService,
    private confirmation: ConfirmationService,
    private errorHandler: ErrorHandlerService,
    private routeStateService: RouteStateService

  ) { }

  ngOnInit(): void {
    this.loaderService.status.subscribe((val: boolean) => {
      this.showLoaderDialog = val;
    });
    this.user = this.sessionService.getItem("currentUser");
    var routeState = this.routeStateService.getCurrent();
    this.listaStatusAtendimento = this.utilService.listaStatusAtendimento();
    if (routeState.data > 0) {
      this.editarPedido(routeState.data);
    }else{
      this.pedido.data = new Date();
      this.pedido.statusAtendimento = 0;
      this.pedido.id = null;
      this.atendimento.salvo = false;
      this.pedido.resposta = null;
      this.listaInstituicao();
    }    
  }


  showAnexo() {
    this.myFormAnexo.reset();
    this.anexo.atendimento = this.atendimento.id;
    this.carregarAnexos();
    this.displayModal = true;
  }

  excluirAnexo(codigoAnexo: number) {
    this.confirmarExclusao(codigoAnexo);
  }


  abrirRecurso(){
   
    this.loaderService.show();
    this.recursoService
    .autorizaRecurso(this.pedido.id)
    .then((data) => {
      this.loaderService.hide();
      this.recurso = data;
      this.headerRecurso = "Abrir Recurso";
      this.displayModalRecurso = true;
    })
    .catch((erro) => {
      this.loaderService.hide();
      this.errorHandler.handle(erro);
    });
  }

  confirmarExclusao(codigoAnexo: number) {
    this.confirmation.confirm({
      message: "Tem certeza que deseja excluir este anexo?",
      accept: () => {
        this.excluir(codigoAnexo);
      },
    });
  }

  excluir(codigoAnexo: number) {
    this.pedidoService
      .excluir(codigoAnexo)
      .then(() => {
        this.loaderService.hide();
        this.carregarAnexos();
        this.messageService.add({
          severity: "success",
          detail: "Anexo excluído com sucesso!",
        });
      })
      .catch((erro) => {
        this.loaderService.hide();
        this.errorHandler.handle(erro);
      });
  }

  onCloseRecurso() {
    this.displayModalRecurso = false;
  }

  onClose() {
    this.displayModal = false;
  }

  salvarRecurso(form: NgForm) {
    this.loaderService.show();
    this.recursoService.registrar(this.recurso)
    .then(response => {
      this.loaderService.hide();
      this.displayModalRecurso = false;
    }).then(response => {
      this.editarPedido(this.recurso.atendimento);
      
    }).then(response => {
      Swal.fire("Recurso enviado com sucesso", "", "success");
    })
    .catch(erro => {
      this.loaderService.hide();
      this.errorHandler.handle(erro);
    });
  }

  salvar(form: NgForm) {
    this.loaderService.show();
    this.pedidoService.registrar(this.pedido)
    .then(response => {
      this.atendimento = response.atendimentoDto;
      this.atendimento.salvo = true;
      this.pedido.numeroProtocolo = this.atendimento.numeroProtocolo;  
      this.pedido.dataPrazo = this.atendimento.dataPrazo;    
      this.pedido.id = this.atendimento.id;
      this.loaderService.hide();
      Swal.fire("Pedido enviado com sucesso", "Protocolo nº: " + this.atendimento.numeroProtocolo, "success");

    })
    .catch(erro => {
      this.loaderService.hide();
      this.errorHandler.handle(erro);
    });
  }

  /**
   * Convert File To Base64
   */
   convertFileToBase64(
    file: File,
    index: number,
    event: { target: { files: File[] }; files: any }
  ) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let anexo = new Anexo();
      anexo.stringBase64 = reader.result as string;
      anexo.nomeArquivo = file.name;
      this.anexo.listaAnexoDto[index] = anexo;
      this.adicionar(event);
    };
  }

  adicionar(event: any) {
    this.loaderService.show();
    this.pedidoService
      .adicionar(this.anexo)
      .then((response) => {
        this.carregarAnexos();
        this.loaderService.hide();
        this.messageService.add({
          severity: "success",
          detail: "Anexo adicionado com sucesso!",
        });
      })
      .then((response) => {
        this.myFormAnexo.reset();
        //event.files.length = 0;
        this.uploadedFiles.length = null;
        this.idAnexoSelecao = false;
      })
      .catch((erro) => {
        this.loaderService.hide();
        this.errorHandler.handle(erro);
      });
  }

  carregarAnexos() {
    this.pedidoService.listar(this.atendimento.id).then((anexos) => {
      this.anexos = anexos;
    });
  }


  carregaArquivo(event: { target: { files: File[] }; files: any}) {
    for (let index = 0; index < event.files.length; index++) {
      const file: File = event.files[index];
      if (file) {
        this.convertFileToBase64(file, index, event);
      }
      this.fileUpload.clear();
    }
  }


  editarRecurso(codigo: number){
    return this.recursoService.editarRecurso(codigo)
    .then((data) => {
      this.recurso = data;
      this.headerRecurso = "Visualizar Recurso";
      this.displayModalRecurso = true;
    })
    .catch(erro => this.errorHandler.handle(erro));
  } 
  


  editarPedido(codigo: number) {
    return this.pedidoService.editarAtendimento(codigo)
    .then((atendimento) => {
      this.atendimento = atendimento
      this.pedido.descricao = atendimento.descricao;
      this.pedido.instituicao = atendimento.instituicao;
      this.pedido.numeroProtocolo = atendimento.numeroProtocolo;
      this.pedido.data = atendimento.dataEntrada;
      this.pedido.area = atendimento.area;
      this.pedido.dataPrazo = atendimento.dataPrazo;
      this.pedido.resposta = atendimento.resposta;
      this.pedido.statusAtendimento = atendimento.statusAtendimento;
      this.pedido.id = atendimento.id;
      this.atendimento.salvo = true;
      this.listaInstituicao();
      this.onAreas();
      this.recursos = atendimento.listaRecursos;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  back() {
    this.routeStateService.loadPrevious();
  }

  
  listaInstituicao(): any[]{
    this.listaInstituicoes = [
      { label: 'SENAI', value: 1 },
      { label: 'SESI', value: 2 }
    ];
    return this.listaInstituicoes;
  }

  listaAreaSenai(): any[]{
    this.listaAreas = [
      { label: 'Educaçao', value: 1 },
      { label: 'Tecnologia e Inovação', value: 2 },
      { label: 'Comercial', value: 3 },
      { label: 'Avaliação e Prospectiva', value: 4 },
      { label: 'Organizacional', value: 5 }
    ];
    return this.listaAreas;
  }


  listaAreaSesi(): any[]{
    this.listaAreas = [
      { label: 'Educaçao', value: 6 },
      { label: 'Saúde e Segurança', value: 7 },
      { label: 'Comercial', value: 8 },
      { label: 'Organizacional', value: 9 }
    ];
    return this.listaAreas;
  }

  onAreas(){
    if (this.pedido.instituicao === 1){
      this.listaAreaSenai();
    }else{
      this.listaAreaSesi();
    }
  }


}
