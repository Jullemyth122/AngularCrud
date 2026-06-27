import { Component, inject } from '@angular/core';
import { CreateFormComponent } from './create/create-form';
import { ReadListComponent } from './read/read-list';
import { CrudService, Item } from './crud.service';

@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [CreateFormComponent, ReadListComponent],
  templateUrl: './crud.html',
  styleUrl: './crud.scss',
})
export class CrudComponent {
  private crudService = inject(CrudService);

  // Grab read-only items signal from service
  items = this.crudService.items;

  onItemCreated(newItem: Item) {
    this.crudService.createItem(newItem);
  }

  onDeleteItem(uid: string) {
    this.crudService.deleteItem(uid);
  }

  onItemUpdated(item: Item) {
    this.crudService.updateItem(item.random_uid, item);
  }
}
