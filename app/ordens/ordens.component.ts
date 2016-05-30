import { Component, OnInit } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { EntradaComponent } from './entrada/entrada.component';
import { SaidaComponent } from './saida/saida.component';
import { FechadasComponent } from './fechadas/fechadas.component';
import { AbertasComponent } from './abertas/abertas.component';
import { ControleComponent } from './controle/controle.component';

@Component({
	moduleId: module.id,
	selector: 'ordens',
	templateUrl: 'ordens.component.html',
	directives: [ ROUTER_DIRECTIVES ]
})

@RouteConfig([
	{ path: '/entrada', name: 'Entrada', component: EntradaComponent, useAsDefault: true },
	{ path: '/saida', name: 'Saida', component: SaidaComponent },
	{ path: '/fechadas', name: 'Fechadas', component: FechadasComponent },
	{ path: '/abertas', name: 'Abertas', component: AbertasComponent },
	{ path: '/controle', name: 'Controle', component: ControleComponent }
])

export class OrdensComponent implements OnInit {
	constructor() { }

	ngOnInit() { }

	
}