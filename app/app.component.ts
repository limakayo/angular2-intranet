import { Component, OnInit } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { ClientesComponent } from './clientes/clientes.component';

@Component({
    selector: 'my-app',
    moduleId: module.id,
    templateUrl: 'app.component.html',
    directives: [ ROUTER_DIRECTIVES ]
})

@RouteConfig([
  {
    path: '/clientes/...',
    name: 'Clientes',
    component: ClientesComponent
  }
])

export class AppComponent {}
