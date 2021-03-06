import { Component, OnInit } from '@angular/core';
import { AutoComplete } from 'primeng/primeng';
import { ClienteService } from '../../clientes/shared/cliente.service';
import { OrdemService } from '../shared/ordem.service';
import { ROUTER_DIRECTIVES } from '@angular/router-deprecated';
      
@Component({
	moduleId: module.id,
	selector: 'fechadas',
	templateUrl: 'fechada.component.html',
	providers: [ClienteService, OrdemService],
	directives: [AutoComplete, ROUTER_DIRECTIVES]
})
export class FechadasComponent implements OnInit {
	cliente: any;
	clientes: any[];
	filteredClientes: any[];

	aprovacoes: any[] = [
		{ id: 1, nome: 'Aprovada' },
		{ id: 2, nome: 'Reprovada' },
		{ id: 3, nome: 'Aguardando' }
	];

	ordens: any[];

	constructor(
		private clienteService: ClienteService,
		private ordemService: OrdemService) { }

	ngOnInit() { }

	changeCliente(cliente: any) {
		this.cliente = cliente;
		this.ordemService.getFechadasCliente(cliente._id).subscribe(
			ordens => this.ordens = ordens
		);
	}

	search(event: any) {
		let query = event.query;
		this.clienteService.getClientes().subscribe(
			clientes => this.filteredClientes = this.filterCliente(query, clientes)
		);
	}

	filterCliente(query: any, clientes: any[]): any[] {
		let filtered: any[] = [];
		if (clientes) {
			for (let cliente of clientes) {
				if (cliente.nome.toLowerCase().indexOf(query.toLowerCase()) > -1) {
					filtered.push(cliente);
				}
			}
		}
		return filtered;
	}

	stringAsDate(dateStr: string) {
		return new Date(dateStr);
	}

	getAprovacao(ordem:any) {
		return this.aprovacoes.filter(a => a.id == ordem.aprovacao)[0].nome;
	}
}