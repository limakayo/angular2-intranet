import { Component } from '@angular/core';

import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { Router } from '@angular/router-deprecated';

import { ClientesComponent } from './clientes/clientes.component';
import { ClienteDetailComponent } from './clientes/cliente-detail.component'

import { HTTP_PROVIDERS } from '@angular/http';

@Component({
    selector: 'my-app',
    template: `
		<h1>{{ title }}</h1>
		<nav>
			<a [routerLink]="['Clientes']">Clientes</a>
		</nav>
		<router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES],
    providers: [
    	HTTP_PROVIDERS,
    	ROUTER_PROVIDERS,
    ]
})

@RouteConfig([
	{
		path: '/clientes',
		name: 'Clientes',
		component: ClientesComponent
	},
  {
    path: '/cliente/:id',
    name: 'ClienteDetail',
    component: ClienteDetailComponent
  }
])

export class AppComponent {
	title = 'Intranet';
}
