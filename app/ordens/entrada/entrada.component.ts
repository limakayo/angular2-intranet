import { Component, OnInit } from '@angular/core';
import { OrdemService } from '../shared/ordem.service';
import { Ordem } from '../shared/ordem.model';
      
@Component({
	moduleId: module.id,
	selector: 'entrada',
	templateUrl: 'entrada.component.html',
	providers: [ OrdemService ],
})
export class EntradaComponent {

	submitted = false;

	model = new Ordem(12, 12);

	onSubmit(form: any) {
		this.submitted = true;
		console.log("submitted: ",form);
	}

	getDiagnostic() {
		return JSON.stringify(this.model);
	} 

	constructor(private ordemService: OrdemService) { }

}