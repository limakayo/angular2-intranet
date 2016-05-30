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

	constructor(private ordemService: OrdemService) { }

  onSubmit(form: any) {
    this.ordemService.addOrdem(form).subscribe(
      data => console.log(data)
    );
		this.submitted = true;
		console.log("submitted: ",form);
	}


}
