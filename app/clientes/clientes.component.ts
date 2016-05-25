//routing
import { Component, OnInit } from '@angular/core';
//import { Routes, Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router';
import { RouteConfig, Router, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { ClienteDetailComponent } from './cliente-detail/cliente-detail.component';
import { ClienteListComponent } from './cliente-list/cliente-list.component';

import { CanActivate } from '@angular/router-deprecated';

import { tokenNotExpired } from 'angular2-jwt';

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
  { path: '/', name:'ClienteList', component: ClienteListComponent, useAsDefault: true },
  { path: '/:id', name:'ClienteDetail', component: ClienteDetailComponent }
])

@CanActivate(() => tokenNotExpired())

export class ClientesComponent {}
