import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { HTTP_PROVIDERS } from '@angular/http';

import { Cliente } from '../shared/cliente.model';
import { ClienteService } from '../shared/cliente.service';

import { ClienteDetailComponent } from '../cliente-detail/cliente-detail.component';

import { Observer } from 'rxjs/Observer';

@Component({
	selector: 'intranet-cliente-list',
	moduleId: module.id,
	templateUrl: 'cliente-list.component.html',
	providers: [
		ClienteService, HTTP_PROVIDERS
	],
	directives: [ClienteDetailComponent]
})
export class ClienteListComponent implements OnInit {

	clientes: Cliente[];
	selectedCliente: Cliente = null;
	errorMessage: string;
	successMessage: string;

	constructor(
		private clienteService: ClienteService,
		private router: Router) { }

	ngOnInit() {
		this.getClientes();
	}

	goToDetail() {
		this.router.navigate(['ClienteDetail', { id: this.selectedCliente._id }]);
	}

	getClientes() {
		this.clienteService.getClientes()
			.subscribe(
				data => this.clientes = data.clientes,
				error => this.errorMessage = <any>error
			);
	}

	addCliente (nome: string) {
		if (!nome) { return; }
		this.clienteService.addCliente(nome)
			.subscribe(
				data => {
					if (data.cliente) {
							this.clientes = [...this.clientes, data.cliente]
							this.errorMessage = null
					} else {
							this.errorMessage = data.message
							setTimeout(() => {
								this.errorMessage = null
							}, 2000)
					}
				},
				error => this.errorMessage = <any>error
			);
	}

	delete(cliente: Cliente, event: any) {
		event.stopPropagation();
		this.clienteService.delete(cliente).subscribe(
			data => {
				this.successMessage = data.message
				setTimeout(() => {
					this.successMessage = null
				}, 2000)
				this.clientes = this.clientes.filter(c => c._id !== cliente._id)
			},
			error => this.errorMessage = <any>error
		);
	}

	onSelect(cliente: Cliente) {
		this.selectedCliente = cliente;
	}

}
