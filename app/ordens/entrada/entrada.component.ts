import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { OrdemService } from '../shared/ordem.service';
import { ClienteService } from '../../clientes/shared/cliente.service';
import { EquipamentoService } from '../../equipamentos/shared/equipamento.service';

import { Ordem } from '../shared/ordem.model';

import { AutoComplete } from 'primeng/primeng';

@Component({
	moduleId: module.id,
	selector: 'entrada',
	templateUrl: 'entrada.component.html',
	providers: [ OrdemService, ClienteService, EquipamentoService ],
	directives: [ AutoComplete ]
})
export class EntradaComponent implements OnInit {

	cliente: any;
	equipamentos: any[];

	numero: number;
	mensagem: string;
	ordemCadastrada: any;

	clientes: any[];
	filteredClientes: any[];

  constructor(
		private router: Router,
		private ordemService: OrdemService,
		private clienteService: ClienteService,
	  private equipamentoService: EquipamentoService){}

	ngOnInit() {
		this.getEquipamentos();
		this.ordemService.getNextId().subscribe(
			numero => this.numero = numero
		)
	}

	getEquipamentos() {
		this.equipamentoService.getEquipamentos().subscribe(
			equipamentos => this.equipamentos = equipamentos
		)
	}

	search(event:any) {
		let query = event.query;
		this.clienteService.getClientes().subscribe(
			clientes => this.filteredClientes = this.filterCliente(query, clientes)
		);
	}

	filterCliente(query:any, clientes: any[]):any[] {
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

  add(form: any) {
		if (typeof form.cliente !== 'object')
			return console.log('Não é um cliente');
		else {
	    this.ordemService.addOrdem(form).subscribe(
	      data => {
					console.log(data)
					this.ordemCadastrada = data
					this.numero = data.numero + 1
					this.mensagem = "Ordem cadastrada com sucesso!"
					setTimeout(() => {
						this.mensagem = null
					}, 10000);
				}
	    );
		}
	}

	goToControle(ordem: Ordem) {
		this.router.navigate(['ControleDetail', { id: ordem.numero }]);
	}


}
