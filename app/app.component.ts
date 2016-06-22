import { Component, OnInit } from '@angular/core';
//import { Routes, Router, ROUTER_DIRECTIVES } from '@angular/router';
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { AuthService } from './shared/auth.service';

import { HomeComponent } from './home/home.component';
import { ClientesComponent } from './clientes/clientes.component';
import { AdminComponent } from './admin/admin.component';
import { OrdensComponent } from './ordens/ordens.component';
import { CobrancaComponent } from './cobranca/cobranca.component';

import { tokenNotExpired } from 'angular2-jwt';

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
  { path: '/admin', name: 'Admin', component: AdminComponent },
  { path: '/ordens/...', name: 'Ordens', component: OrdensComponent },
  { path: '/cobranca', name: 'Cobranca', component: CobrancaComponent }
])

export class AppComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit() {
    if (tokenNotExpired()) this.getUser();
  }

  getUser() {
    this.auth.getUser().subscribe(
      data => {
        if (data.app_metadata.roles[0] == "admin")
            this.auth.userIsAdmin = true
        }
    );
  }

}
