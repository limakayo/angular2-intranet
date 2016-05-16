import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';

import { Router } from '@angular/router-deprecated';

import { Observer } from 'rxjs/Observer';

@Component({
	selector: 'clientes',
	templateUrl: 'app/clientes/clientes.component.html',
	providers: [
		ClienteService,
	]
})
export class ClientesComponent implements OnInit {

	clientes: Cliente[];
	selectedCliente: Cliente = null;
	errorMessage: string;

	constructor(
		private _clienteService: ClienteService,
		private _router: Router) { }

	ngOnInit() {
		this.getClientes();
	}

	goToDetail() {
		this._router.navigate(['ClienteDetail', { id: this.selectedCliente.id }]);
	}

	getClientes() {
		this._clienteService.getClientes()
			.subscribe(
				data => this.clientes = data.clientes,
				error => this.errorMessage = <any>error
			);
	}

	addCliente (nome: string) {
		if (!nome) { return; }
		this._clienteService.addCliente(nome)
			.subscribe(
				data => this.clientes = [...this.clientes, data[0]],
				error => this.errorMessage = <any>error
			);
	}

	onSelect(cliente: Cliente) {
		this.selectedCliente = cliente;
	}

}
