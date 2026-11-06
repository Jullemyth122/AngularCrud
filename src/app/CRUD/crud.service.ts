import { Injectable, signal, effect } from '@angular/core';

export interface Item {
  name: string;
  email: string;
  age: number;
  random_uid: string;
  location: string;
}

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  private STORAGE_KEY = 'angular_crud_items';

  // Store state in an Angular Signal
  private itemsSignal = signal<Item[]>([]);

  // Expose as read-only signal
  items = this.itemsSignal.asReadonly();

  constructor() {
    // Load initial data from localStorage
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      try {
        this.itemsSignal.set(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse CRUD items from localStorage', e);
      }
    } else {
      // Seed with some mock data for initial experience
      this.itemsSignal.set([
        {
          name: 'Jane Doe',
          email: 'jane@example.com',
          age: 28,
          random_uid: 'uid-8f3a9d2c',
          location: 'San Francisco, CA',
        },
        {
          name: 'John Smith',
          email: 'john.smith@example.com',
          age: 34,
          random_uid: 'uid-4b2c1e5a',
          location: 'New York, NY',
        },
      ]);
    }

    // Auto-save changes to localStorage whenever the signal updates
    effect(() => {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.itemsSignal()));
    });
  }

  createItem(newItem: Item) {
    this.itemsSignal.update((current) => [...current, newItem]);
  }

  updateItem(uid: string, updatedFields: Partial<Item>) {
    this.itemsSignal.update((current) =>
      current.map((item) => (item.random_uid === uid ? { ...item, ...updatedFields } : item)),
    );
  }

  deleteItem(uid: string) {
    this.itemsSignal.update((current) => current.filter((item) => item.random_uid !== uid));
  }
}
