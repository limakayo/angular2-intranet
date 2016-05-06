import {Component} from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {Router} from '@angular/router-deprecated';
import {ClientesComponent} from './clientes/clientes.component';
import {ClienteService} from './clientes/cliente.service';
import {HTTP_PROVIDERS} from '@angular/http';

import { provide } from '@angular/core';
import { XHRBackend } from '@angular/http';

// in-memory web api imports
import { InMemoryBackendService, SEED_DATA } from 'angular2-in-memory-web-api/core';
import { ClienteData } from './clientes/cliente-data';

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
    	ClienteService,
    	// in memory web api providers
    	provide(XHRBackend, {useClass: InMemoryBackendService}),
    	provide(SEED_DATA, {useClass: ClienteData})
    ]
})

@RouteConfig([
	{
		path: '/clientes',
		name: 'Clientes',
		component: ClientesComponent
	}
])

export class AppComponent { 
	title = 'Intranet';
}
