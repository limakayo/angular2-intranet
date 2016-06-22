import { Component, OnInit, ElementRef } from '@angular/core';
import { ClienteService } from '../clientes/shared/cliente.service';
import { OrdemService } from '../ordens/shared/ordem.service';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { AutoComplete } from '../shared/autocomplete';

@Component({
	moduleId: module.id,
	selector: 'intranet-cobranca',
	templateUrl: 'cobranca.component.html',
	providers: [ClienteService, OrdemService],
	directives: [AutoComplete, ROUTER_DIRECTIVES],
})
export class CobrancaComponent {

	ordens: any[];

	constructor(
		private clienteService: ClienteService,
		private ordemService: OrdemService) {}
}
