import { Component, ElementRef, OnInit } from '@angular/core';
import { ClienteService } from '../clientes/shared/cliente.service';
import { Cliente } from '../clientes/shared/cliente.model';

@Component({
  selector: 'autocomplete',
  template: `
    <input #input type="text" class="form-control input-list" [(ngModel)]="query" (keyup)="filter($event)">
    <button class="button-list" (click)="showAll(input)">
      <i class="fa fa-sort-desc" aria-hidden="true"></i>
    </button>

    <ul id="list-group" class="list-group group-list" *ngIf="filteredList.length > 0">
        <li *ngFor="let item of filteredList" [class.active]="item.selected" [id]="item.selected" class="list-group-item item-list" (click)="select(item)">
          {{ item.nome }}
        </li>
    </ul>

    <p *ngIf="selectedItem">Selected: {{ selectedItem | json }}</p>
  `,
  host: {
    '(document:click)': 'handleClick($event)',
    '(keydown)': 'handleKeyDown($event)'
  },
  providers: [ ClienteService ]
})
export class AutoComplete implements OnInit {

  query: string = '';
  filteredList: any[] = [];
  selectedItem: any;
  item: any;
  items: any[];
  elementRef: ElementRef;
  pos: number = -1;
  opened: boolean = false;
  lastQuery: string = '';

  constructor(private el: ElementRef, private clienteService: ClienteService) {
    this.elementRef = el;
  }

  ngOnInit() {
    this.clienteService.getClientes().subscribe(
      items => this.items = items
    );
  }

  filter(event:any) {

    this.clearSelects();

    if (this.query !== '') {
      if (this.opened) {
        this.filteredList = this.items;
      }

      // If query is different
      if (this.lastQuery.localeCompare(this.query) != 0) {
        // Change position to top
        this.pos = 0;
      }

      if (event.keyCode != 38 && event.keyCode != 40) {
        this.filteredList = this.items.filter((el: any) => {
          return el.nome.toLowerCase().indexOf(this.query) > -1;
        });
      }

      if (this.selectedItem) {
        console.log("Selected item: ", this.selectedItem.nome);
      }
      console.log("Query: ", this.query);
      console.log("Last Query: ", this.lastQuery);
      console.log("---------");
      
      this.lastQuery = this.query;

    } else {

      // If this list is as showAll
      if (this.opened) {
        // Show all items
        this.filteredList = this.items;
      // If this list is not as showAll
      } else {
        // Remove items
        this.filteredList = [];
      }

    } 

    for (let i = 0; i < this.filteredList.length; i++) {
      this.filteredList[i].selected = false;
    }

    if (this.selectedItem) {
        this.filteredList.map((i) => {
        if (i._id == this.selectedItem._id) {
          // Set it as selected and change position
          this.pos = this.filteredList.indexOf(i);
        }
      })
      this.selectedItem = null;
    }

    // Arrow-key Down
    if (event.keyCode == 40) {
      if (this.pos + 1 != this.filteredList.length)
        this.pos++;
    }

    // Arrow-key Up
    if (event.keyCode == 38) {
      if (this.pos > 0)
        this.pos--;
    }

    if (this.filteredList[this.pos] !== undefined)
      this.filteredList[this.pos].selected = true;

    //enter
    if (event.keyCode == 13) {
      if (this.filteredList[this.pos] !== undefined) {
        this.select(this.filteredList[this.pos]);
      }
    }

    // Handle scroll position of item
    let listGroup = document.getElementById('list-group');
    let listItem = document.getElementById('true');
    if (listItem) {
      listGroup.scrollTop = (listItem.offsetTop - 100);
    }

  }

  select(item: any) {
    this.selectedItem = item;
    this.selectedItem.selected = true;
    this.query = item.nome;
    this.filteredList = [];
  }

  showAll(input:any) {
    // On show all click select input box
    input.select();

    //this.filter();

    // If list is opened, set opened as false
    if (this.filteredList.length > 0) {
      this.opened = false;
      this.filteredList = [];
    // If list is closed, set opened as true
    } else {
      this.opened = true;
      this.filteredList = this.items;
      // Remove select from items
      this.clearSelects();
    }

    //this.configurePosition();



    /*if (this.lastQuery.localeCompare(this.query) != 0) {
        this.filteredList = this.items.filter((el: any) => {
          return el.nome.toLowerCase().indexOf(this.query) > -1;
        });
    } else {

        if (this.selectedItem) {
          this.filteredList.map((i) => {
            if (i._id == this.selectedItem._id) {
              i.selected = true;
              this.pos = this.filteredList.indexOf(i);
            }
          })
        }

        if (this.opened) {
          this.filteredList = this.items;
        } else {
          this.filteredList = [];
        }
    }*/

  }

  handleKeyDown(event: any) {
    // Prevent default actions of arrows
    if (event.keyCode == 40 || event.keyCode == 38) {
      event.preventDefault();
    }
  }

  /** Remove selected from all items of the list **/
  clearSelects() {
    if (this.selectedItem) {
      for (let i = 0; i < this.filteredList.length; i++) {
        if (this.filteredList[i]._id != this.selectedItem._id)
          this.filteredList[i].selected = false;
      }
    }
  }

  clearSelectedItem() {
    if (this.selectedItem) {
      for (let i = 0; i < this.filteredList.length; i++) {
        if (this.filteredList[i]._id == this.selectedItem._id)
          this.filteredList[i].selected = false;
      }
    }
  }

  /** Handle outside click to close suggestions**/
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

}
