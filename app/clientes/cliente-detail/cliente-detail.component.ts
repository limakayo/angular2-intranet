import { Component } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';

import { Cliente } from '../shared/cliente.model';
import { ClienteService } from '../shared/cliente.service';

@Component({
  selector: 'intranet-cliente',
  moduleId: module.id,
  templateUrl: 'cliente-detail.component.html',
  providers: [ClienteService]
})
export class ClienteDetailComponent {
  cliente: Cliente;
  errorMessage: string;
  successMessage: string;

  constructor (
    private clienteService: ClienteService,
    private routeParams: RouteParams
  ) {}

  ngOnInit() {
    let id = this.routeParams.get('id');
    this.getCliente(id);
  }

  getCliente(id: string) {
    this.clienteService.getCliente(id).subscribe(
      cliente => this.cliente = cliente,
      error => this.errorMessage = <any>error
    );
  }

  save() {
    this.clienteService.save(this.cliente).subscribe(
      data => {
        if (data.cliente) {
          this.successMessage = data.message
          setTimeout(() => { this.successMessage = null }, 2000)
        } else {
          this.errorMessage = data.message
          setTimeout(() => { this.errorMessage = null }, 2000)
        }
      }
    )
  }

  goBack() {
    window.history.back();
  }
}
