import { Component, OnInit } from '@angular/core';
import { ItemService } from 'src/app/service/item.service';
import { Item } from 'src/app/entity/item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  items: Item[];
  novoItem = new Item();

  constructor(private itemService: ItemService) {

   }

  ngOnInit() {
    this.listItems();
  }

  listItems() {
    this.itemService.getItemList().subscribe(
      data => {
        this.items = data;
      }
    );
  }

  insertNewItem() {
    // Calling the service to insert new item
    this.itemService.insertNewItem(this.novoItem).
    subscribe(novoItem => this.items.push(novoItem));
    this.novoItem = new Item();
  }

  deleteItem(deletedItem: Item): void {
    this.items = this.items.filter(h => h !== deletedItem);
    this.itemService.deleteItem(deletedItem).subscribe();
  }

  updateItem(updatedItem: Item): void {
    this.itemService.updateItem(updatedItem)
      .subscribe();
  }
}
