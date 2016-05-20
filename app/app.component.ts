import { Component, OnInit } from '@angular/core';
import { Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';

import { ClientesComponent } from './clientes/clientes.component';

@Component({
    selector: 'my-app',
    moduleId: module.id,
    template: `
      <h1>Intranet</h1>
      <nav>
        <a [routerLink]="['/clientes']">Clientes</a>
      </nav>
      <router-outlet></router-outlet>
    `,
    directives: [ ROUTER_DIRECTIVES ],
})

@Routes([
  { path: '/clientes', component: ClientesComponent }
])

export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.navigate(['/clientes']);
  }
}
