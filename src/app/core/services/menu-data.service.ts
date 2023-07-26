import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CustomMenuItem } from '../models/menu-item.model';

@Injectable({
    providedIn: 'root',
})
/**
 * menu data service
 */
export class MenuDataService {

    public toggleMenuBar: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    getMenuList(): CustomMenuItem[] {
        return [
            {
                Label: 'Registrar Pedido', Icon: 'fa-home', RouterLink: '/main/dashboard', Childs: null, IsChildVisible: false
            },
           // {
           //     Label: 'Atendimento', Icon: 'fa-envelope', RouterLink: '/main/atendimento', Childs: null, IsChildVisible: false
            //},
            //{
              //  Label: 'Registrar Pedido', Icon: 'fa-envelope', RouterLink: '/main/pedido-cadastro', Childs: null, IsChildVisible: false
            //},
            {
                Label: 'Consultar Pedido', Icon: 'fa-envelope', RouterLink: '/main/pedido', Childs: null, IsChildVisible: false
            },
            {
                Label: 'Solicitar ou Consultar Recurso', Icon: 'fa-envelope', RouterLink: '/main/recurso', Childs: null, IsChildVisible: false
            },
            {
                Label: 'Dados Cadastrais', Icon: 'fa-envelope', RouterLink: 'main/dados-cadastrais', Childs: null, IsChildVisible: false
            },
            {
                Label: 'Sair', Icon: 'fa-home', RouterLink: 'sair', Childs: null, IsChildVisible: false
            }

        ];
    }
}
