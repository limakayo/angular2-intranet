//routing
import { Component, OnInit } from '@angular/core';
import { Routes, Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';

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
@Routes([
  { path: '', component: ClienteListComponent },
  { path: '/:id', component: ClienteDetailComponent }
])
export class ClientesComponent {}
