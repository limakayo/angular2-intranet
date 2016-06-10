import { Component, OnInit } from '@angular/core';
import { Router, RouteParams } from '@angular/router-deprecated';

import { OrdemService } from '../shared/ordem.service';
import { AcessorioService } from '../../shared/acessorio.service';

import { Currency } from '../shared/currency';

import { FORM_DIRECTIVES } from '@angular/common';

@Component({
	moduleId: module.id,
	selector: 'controle',
	templateUrl: 'controle.component.html',
	providers: [ OrdemService, AcessorioService ],
	directives: [  Currency, FORM_DIRECTIVES ]
})
export class ControleComponent implements OnInit {

	ordem: any;
	errorMessage: string;
	numero: number;

	acessorios: any[];
	acessoriosSelecionados: any[];
	acessorio: any;

	constructor(
		private ordemService: OrdemService,
		private acessorioService: AcessorioService,
	    private router: Router,
	    private routeParams: RouteParams) { }

	ngOnInit() {
		this.getAcessorios();
		if (this.routeParams.get('id')) {
		  let numero = this.routeParams.get('id');
		  this.getOrdem(numero);
		}
	}

	stringAsDate(dateStr: string) {
		return new Date(dateStr);
	}

	getAcessorios() {
		this.acessorioService.getAcessorios().subscribe(
			acessorios => this.acessorios = acessorios
		);
	}

	onCheckboxChange(acessorio: any) {
		if (acessorio.selected == true) {
			this.acessoriosSelecionados.push(acessorio);
		} else {
			let i = this.acessoriosSelecionados.indexOf(acessorio);
			if (i != -1) {
				this.acessoriosSelecionados.splice(i, 1);
			}
		}
    }

	getOrdem(numero: string) {
		this.ordemService.getOrdem(numero).subscribe(
			data => {
				if (data.ordem) {
					this.acessoriosSelecionados = data.ordem.acessorios;
					console.log(this.acessoriosSelecionados);
					this.errorMessage = null;
					this.ordem = data.ordem;
					this.numero = data.ordem.numero;
				} else {
					this.ordem = null;
					this.errorMessage = data.error;
				}
			},
			error => this.errorMessage = <any>error
		)
	}

	editOrdem(form: any) {
		if (form.solucao != '' && form.solucao != null && form.data_hora_orcamento == null) {
			form.data_hora_orcamento = new Date;
		} else {
			form.data_hora_orcamento = null;
		}
		this.ordemService.editOrdem(form).subscribe(
			ordem => this.ordem = ordem
		)
	}


}
