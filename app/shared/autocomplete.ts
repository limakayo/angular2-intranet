import { Component, ElementRef, OnInit } from '@angular/core';
import { ClienteService } from '../clientes/shared/cliente.service';
import { Cliente } from '../clientes/shared/cliente.model';

@Component({
  selector: 'autocomplete',
  template: `
    <input #input type="text" class="form-control input-list" [(ngModel)]="query" (keyup)="filter()">
    <button class="button-list" (click)="showAll(input)">
      <i class="fa fa-sort-desc" aria-hidden="true"></i>
    </button>

    <ul class="list-group group-list" *ngIf="filteredList.length > 0">
        <li *ngFor="let item of filteredList" [class.active]="item.selected" class="list-group-item item-list" (click)="select(item)">
          {{ item.nome }}
        </li>
    </ul>
  `,
  host: {
    '(document:click)': 'handleClick($event)',
    '(keyup)': 'handleKey($event)'
  },
  providers: [ ClienteService ]
})
export class AutoComplete implements OnInit {

  query: string = '';
  filteredList: any[] = [];
  item: any;
  items: any[];
  elementRef: ElementRef;
  pos: number = -1;

  constructor(private el: ElementRef, private clienteService: ClienteService) {
    this.elementRef = el;
  }

  ngOnInit() {
    this.clienteService.getClientes().subscribe(
      items => this.items = items
    );
  }

  filter() {
    if (this.query !== '') {
      this.filteredList = this.items.filter((el: any) => {
        return el.nome.toLowerCase().indexOf(this.query) > -1;
      });
    } else {
      this.filteredList = [];
    }
  }

  select(item: any) {
    this.query = item.nome;
    this.filteredList = [];
  }

  showAll(input:any) {
    input.select();
    if (this.filteredList.length > 0) {
      this.filteredList = [];
    } else {
      this.filteredList = this.items;
    }
  }

  handleClick(event: any) {
    let clickedComponent = event.target;
    let inside = false;
    do {
      if (clickedComponent === this.elementRef.nativeElement) {
        inside = true;
      }
      clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);
    if (!inside) {
      this.filteredList = [];
    }
  }

  handleKey(event: any) {
    this.filteredList = this.items;

    if (this.filteredList[this.pos] !== undefined)
      this.filteredList[this.pos].selected = false;

    //down
    if (event.keyCode == 40) {
      if (this.pos+1 != this.filteredList.length)
        this.pos++;
    }
    
    //up
    if (event.keyCode == 38) {
      if (this.pos > 0)
        this.pos--;
    }

    if (this.filteredList[this.pos] !== undefined) {
      this.filteredList[this.pos].selected = true;
    } 

    //enter
    if (event.keyCode == 13) {
      if (this.filteredList[this.pos] !== undefined) {
        console.log(this.filteredList[this.pos].nome);
      }
    }

  }

}
