import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';

@Component({
	selector: 'clientes',
	templateUrl: 'app/clientes.component.html',
})
export class ClientesComponent implements OnInit {

	clientes: Cliente[];
	errorMessage: string;

	constructor(private _clienteService: ClienteService) {}

	ngOnInit() {
		this.getClientes();
	}

	getClientes() {
		this._clienteService.getClientes()
							.subscribe(
								clientes => this.clientes = clientes,
								error => this.errorMessage = <any>error);
	}

}