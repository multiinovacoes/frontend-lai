import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormControl, FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { ToastService } from 'src/app/core/services/toast.service';
import { birthDateValidator } from 'src/app/core/validators/birthdate.validators';
import { UserDataService } from 'src/app/core/services/user-data.service';
import { environment } from 'src/environments/environment';
import { Manifestante } from 'src/app/core/models/manifestante.model';
import { LoaderService } from 'src/app/core/services/loader.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { RouteStateService } from 'src/app/core/services/route-state.service';
import { UtilService } from 'src/app/util.service';
import { MessageService } from 'primeng/api';
import { RegisterService } from './register-user.service';
import { User } from 'src/app/core/models/user.model';




@Component({
  selector: 'app-register-user',
  templateUrl: 'register-user.component.html',
  styleUrls: ['register-user.component.css']
})
export class RegisterUserComponent implements OnInit {


  name: string;

  emailId: string;

  password: string;

  version: string;

  manifestante = new Manifestante();

  tipoDocumentos!: any;

  origensContato!: any;

  ufs!: any;

  user = new User();

  mascaraCPF = true;
  mascaraCNPJ = true;
  mascara = false;

  constructor( private messageService: MessageService,
    private loaderService: LoaderService,
    private router: Router,
    private userService: UserDataService,
    private errorHandler: ErrorHandlerService,
    private routeStateService: RouteStateService,
    private utilService: UtilService,
    private register: RegisterService) {


     }

  ngOnInit() {
    this.version = environment.version;
    this.manifestante.tipo = "1";
    this.manifestante.senha = "";
    this.manifestante.email = "";
    this.manifestante.id = null;
    this.manifestante.origemContato = 1;
    this.listaTiposDocumentoPessoaFisica();
    this.ufs = this.utilService.listaUfs();
    this.listaOrigemContato();
    this.mascaraCPF = true;
    this.mascaraCNPJ = true;
    this.mascara = false;
  }

  onClickRegisterUser() {
//    let isRegistered: boolean = this.userService.addUser(this.userform.controls["name"].value,
     // this.userform.controls["password"].value,
     // this.userform.controls["emailId"].value,
     // this.userform.controls["birthDate"].value);
    //if (isRegistered) {
      //this.router.navigate(['/login']);
      //this.toastService.addSingle("success", "", "User registered.")
   // }
  }

  salvar() {
    this.register.registrar(this.manifestante)
    .then(response => {
      this.manifestante = response.manifestanteDto;
      this.messageService.add({ severity: 'success', detail: 'Usuário cadastrado com sucesso!' });
    })
    .catch(erro => this.errorHandler.handle(erro));  
  }

  onClickGoToLogin() {
    this.router.navigate(['/login']);
  }


  onClickLogin(form: NgForm) {
    this.userService.getUserByUserNameAndPassword("lai_cadastro", "123")
      .then(() => {
        console.log(this.userService.jwtPayload);
        this.user.nome = this.userService.jwtPayload.nome;
        this.user.orgao = this.userService.jwtPayload.id_orgao;
        this.manifestante.numeroDocumento = form.value.numeroDocumento;
        this.manifestante.telefone = form.value.telefone;
        this.salvar();
      }).then(res => {
        this.routeStateService.add("Login", '/login', null, true);
      })
      .catch(erro => {
        console.log('login ' + erro);
        //this.toastService.addSingle('error', '', erro);
        return;
      });

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


  carregarTiposDocumento() {
   // this.atendimentoService.listarTiposDocumentos(this.atendimento.orgao)
   //   .then(tipoDocumentos => {
   //     this.tipoDocumentos = tipoDocumentos.
   //       map((o: { descricao: any; id: any; }) => ({ label: o.descricao, value: o.id }));
   //   })
   //   .catch(erro => this.errorHandler.handle(erro));
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

