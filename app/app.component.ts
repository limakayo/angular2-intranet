import { Component, OnInit } from '@angular/core';
//import { Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { AuthService } from './shared/auth.service';

import { HomeComponent } from './home/home.component';
import { ClientesComponent } from './clientes/clientes.component';
import { AdminComponent } from './admin/admin.component';

@Component({
    selector: 'my-app',
    moduleId: module.id,
    templateUrl: 'app.component.html',
    directives: [ ROUTER_DIRECTIVES ],
    providers: [AuthService],
})

@RouteConfig([
  { path: '/', name: 'Home', component: HomeComponent, useAsDefault: true },
  { path: '/clientes/...', name: 'Clientes', component: ClientesComponent },
  { path: '/admin', name: 'Admin', component: AdminComponent }
])

export class AppComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit() {
    if (this.auth.user) {
      //this.auth.setRole();
      console.log(this.auth.setRole());
    }
  }

}
