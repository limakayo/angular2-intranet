import { Component } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';

import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'cliente-detail',
  template: '{{ cliente.nome }}'
})
export class ClienteDetailComponent {
  cliente: Cliente;

  constructor (
    private clienteService: ClienteService,
    private routeParams: RouteParams
  ) {}

  ngOnInit() {
    let id = +this.routeParams.get('id');
    this.clienteService.getCliente(id);
  }

  goBack() {
    window.history.back();
  }
}
