import { Component, OnInit } from '@angular/core';
import { Router, RouteParams } from '@angular/router-deprecated';

import { OrdemService } from '../shared/ordem.service';

import { MaskDirective } from '../shared/mask.directive';

import { FORM_DIRECTIVES } from '@angular/common';

@Component({
	moduleId: module.id,
	selector: 'controle',
	templateUrl: 'controle.component.html',
	providers: [ OrdemService ],
	directives: [  MaskDirective ]
})
export class ControleComponent implements OnInit {

	valor:any = '1929843';

	ordem: any;
	errorMessage: string;
	numero: number;

	constructor(
		private ordemService: OrdemService,
    private router: Router,
    private routeParams: RouteParams) { }

	ngOnInit() {
    if (this.routeParams.get('id')) {
      let numero = this.routeParams.get('id');
      this.getOrdem(numero);
    }
  }

	stringAsDate(dateStr: string) {
		return new Date(dateStr);
	}

	getOrdem(numero: string) {
		this.ordemService.getOrdem(numero).subscribe(
			data => {
				if (data.ordem) {
					console.log(data.ordem);
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
		console.log(form);
		this.ordemService.editOrdem(form).subscribe(
			data => console.log(data)
		)
	}


}
