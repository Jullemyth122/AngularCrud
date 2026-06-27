import { Component, input, output, signal } from '@angular/core';
import { Item } from '../crud.service';
import { DeleteConfirmComponent } from '../delete/delete-confirm';
import { UpdateFormComponent } from '../update/update-form';

@Component({
  selector: 'read-list',
  standalone: true,
  imports: [DeleteConfirmComponent, UpdateFormComponent],
  templateUrl: './read-list.html',
  styleUrl: './read-list.scss',
})
export class ReadListComponent {
  items = input<Item[]>([]);

  // Outputs to parent (CrudComponent)
  deleteItem = output<string>();
  updateItem = output<Item>();

  // Tracks which item is pending delete confirmation (by UID)
  pendingDeleteUid = signal<string | null>(null);

  // Tracks which item is currently being edited (by UID)
  editingUid = signal<string | null>(null);

  // --- Delete flow ---
  requestDelete(uid: string) {
    this.editingUid.set(null); // Close any open edit form
    this.pendingDeleteUid.set(uid);
  }

  onDeleteConfirmed(uid: string) {
    this.deleteItem.emit(uid);
    this.pendingDeleteUid.set(null);
  }

  onDeleteCancelled() {
    this.pendingDeleteUid.set(null);
  }

  // --- Update flow ---
  requestEdit(uid: string) {
    this.pendingDeleteUid.set(null); // Close any open delete prompt
    this.editingUid.set(uid);
  }

  onUpdateSubmitted(updatedItem: Item) {
    this.updateItem.emit(updatedItem);
    this.editingUid.set(null);
  }

  onEditCancelled() {
    this.editingUid.set(null);
  }
}
