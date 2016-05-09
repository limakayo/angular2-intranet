import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';

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
	errorMessage: string;

	constructor(private _clienteService: ClienteService) { }

	ngOnInit() {
		this.getClientes();
	}

	getClientes() {
		this._clienteService.getClientes()
			.subscribe(
				data => {
					this.clientes = data.clientes
				},
				error => this.errorMessage = <any>error
			);
	}
	
	addCliente (nome: string) {
		if (!nome) { return; }
		this._clienteService.addCliente(nome)
			.subscribe(
				data => {
					this.clientes.push(data)
				},
				error => this.errorMessage = <any>error
			);
	}

}