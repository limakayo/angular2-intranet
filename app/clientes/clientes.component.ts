//routing
import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { ClienteDetailComponent } from './cliente-detail/cliente-detail.component';
import { ClienteListComponent } from './cliente-list/cliente-list.component';

@Component({
  moduleId: module.id,
  selector: 'intranet-clientes',
  template: `
    <h2>Clientes</h2>
    <router-outlet></router-outlet>
  `,
  directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
  {
    path: '/',
    name: 'ClienteList',
    component: ClienteListComponent,
    useAsDefault: true
  },
  {
    path: '/detail/:id',
    name: 'ClienteDetail',
    component: ClienteDetailComponent
  }
])
export class ClientesComponent {}
